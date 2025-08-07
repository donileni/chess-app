import z from "zod/v4";
import { ChessService } from "../../../services/chess-service";

const ChessComPerformanceSchema = z.object({
    last: z.object({
        rating: z.number(),
        date: z.number(),
        rd: z.number(),
    }),
    record: z.object({
        win: z.number(),
        loss: z.number(),
        draw: z.number(),
    }),
});

export const ChessComStatsSchema = z.object({
    chess_daily: ChessComPerformanceSchema.optional(),
    chess_rapid: ChessComPerformanceSchema.optional(),
    chess_blitz: ChessComPerformanceSchema.optional(),
    chess_bullet: ChessComPerformanceSchema.optional(),
});
export type ChessComStats = z.infer<typeof ChessComStatsSchema>;

type ArchiveUrl = string;
export type ChessComArchive = {
    archives: ArchiveUrl[];
};

export const ChessComResultValues = [
    "win",
    "checkmated",
    "agreed",
    "repetition",
    "timeout",
    "resigned",
    "stalemate",
    "lose",
    "insufficient",
    "50move",
    "abandoned",
    "kingofthehill",
    "threecheck",
    "timevsinsufficient",
    "bughousepartnerlose",
] as const;

export type ChessComResult = (typeof ChessComResultValues)[number];

export const ChessComPlayerSchema = z.object({
    rating: z.number(),
    result: z.enum(ChessComResultValues),
    username: z.string(),
});

export const ChessVariantValues = [
    "chess",
    "chess960",
    "bughouse",
    "kingofthehill",
    "threecheck",
    "crazyhouse",
] as const;

export const ChessVariantSchema = z.enum(ChessVariantValues);

export type ChessVariant = (typeof ChessVariantValues)[number];

export const ChessTimeClassValues = [
    "daily",
    "rapid",
    "blitz",
    "bullet",
] as const;

export const ChessTimeClassSchema = z.enum(ChessTimeClassValues);

export type ChessTimeClass = (typeof ChessTimeClassValues)[number];

export const ChessGameAccuraciesSchema = z.object({
    white: z.number(),
    black: z.number(),
});

export const ChessComGameSchema = z
    .object({
        url: z.string(),
        pgn: z.string(),
        time_control: z.string(),
        end_time: z.number(),
        rated: z.boolean(),
        initial_setup: z.string(),
        fen: z.string(),
        rules: ChessVariantSchema,
        time_class: ChessTimeClassSchema,
        white: ChessComPlayerSchema,
        black: ChessComPlayerSchema,
        accuracies: ChessGameAccuraciesSchema.optional(),
    })
    .transform((obj) => ({
        ...obj,
        meta: ChessService.parsePgn(obj.pgn, obj.initial_setup),
    }));

export type ChessComGame = z.infer<typeof ChessComGameSchema>;

export const ChessComGamesSchema = z.object({
    games: z.array(ChessComGameSchema),
});

export type ChessComGames = z.infer<typeof ChessComGamesSchema>;
