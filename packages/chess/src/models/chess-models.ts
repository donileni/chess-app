import { type ParseTree } from "@mliebelt/pgn-parser";
import z from "zod/v4";
import {
    type ChessComGame,
    ChessComResultValues,
} from "../features/import/models/chess-com-models";
import { ChessService } from "../services/chess-service";

export type PgnGame = {
    tags: ParseTree["tags"];
    moves: ParseTree["moves"];
    pgn: string;
};

// directly from lichess api
export const ChessPlayerAnalysisSchema = z.object({
    inaccuracy: z.number().optional(),
    mistake: z.number().optional(),
    blunder: z.number().optional(),
    averageCentipawnLoss: z.number().optional(),
    accuracy: z.number(),
});

export const ChessPlayerSchema = z.object({
    rating: z.number(),
    username: z.string(),
    result: z.enum(ChessComResultValues), // update this to not rely on chess.com
    externalAnalysis: ChessPlayerAnalysisSchema.optional(),
});

export const ChessGameSource = ["chess.com", "lichess"] as const;
export type ChessGameSource = (typeof ChessGameSource)[number];

export const ChessGameSchema = z
    .object({
        url: z.string().optional(),
        pgn: z.string(),
        timeControl: z.string(),
        endTimeUnix: z.number(),
        rated: z.boolean(),
        initialFen: z.string(),
        rules: z.string(),
        source: z.enum(ChessGameSource),
        white: ChessPlayerSchema,
        black: ChessPlayerSchema,
    })
    .transform((obj) => {
        const meta = ChessService.parsePgn(obj.pgn, obj.initialFen);
        return {
            ...obj,
            meta,
        };
    });

export type ChessGame = z.infer<typeof ChessGameSchema>;

const from = (game: ChessGame) => game;

const fromChessCom = (game: ChessComGame): ChessGame => ({
    endTimeUnix: game.end_time,
    initialFen: game.initial_setup,
    pgn: game.pgn,
    rated: game.rated,
    rules: game.rules,
    timeControl: game.time_control,
    url: game.url,
    meta: game.meta,
    source: "chess.com",
    black: {
        username: game.black.username,
        rating: game.black.rating,
        result: game.black.result,
        externalAnalysis: game.accuracies
            ? { accuracy: game.accuracies.black }
            : undefined,
    },
    white: {
        username: game.white.username,
        rating: game.white.rating,
        result: game.white.result,
        externalAnalysis: game.accuracies
            ? { accuracy: game.accuracies.white }
            : undefined,
    },
});

export const ChessGame = { from, fromChessCom };
