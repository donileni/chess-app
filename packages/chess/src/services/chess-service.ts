import { to } from "@banjoanton/utils";
import { createLogger, ErrorUtil } from "@chess-app/common";
import { parseGame } from "@mliebelt/pgn-parser";
import type { PgnGame } from "../models/chess-models";

const logger = createLogger("chess-service");

const parsePgn = (pgn: string, fen?: string): PgnGame => {
    const [error, parsed] = to(() =>
        parseGame(pgn, { fen, startRule: "game" })
    );

    if (error) {
        logger.error({ pgn, error }, "Failed to parse PGN");
        const message = ErrorUtil.toErrorMessage(error);
        throw new Error(`Failed to parse PGN: ${message}`);
    }

    const game: PgnGame = {
        tags: parsed.tags,
        moves: parsed.moves,
        pgn,
    };

    return game;
};

export const ChessService = { parsePgn };
