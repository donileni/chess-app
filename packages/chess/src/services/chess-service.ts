import { parseGame } from "@mliebelt/pgn-parser";
import type { PgnGame } from "../models/chess-models";

const parsePgn = (pgn: string, fen?: string): PgnGame => {
    const parsed = parseGame(pgn, { fen, startRule: "game" });

    const game: PgnGame = {
        tags: parsed.tags,
        moves: parsed.moves,
        pgn,
    };

    return game;
};

export const ChessService = { parsePgn };
