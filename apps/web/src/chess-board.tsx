import { useEffect, useMemo } from "react";
import { Chessboard } from "react-chessboard";
import Engine from "./providers/engine";
import { ChessComService } from "@chess-app/chess";

const DEFAULT_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const ChessBoard = () => {
    const engine = useMemo(() => new Engine(), []);

    useEffect(() => {
        engine.evaluatePosition(DEFAULT_FEN, 21);
        engine.onMessage((message) => {
            if (message.depth && message.depth < 10) return;
            console.log("Engine message:", message);
        });
    }, []);

    useEffect(() => {
        ChessComService.fetchPlayer("magnuscarlsen");
    }, []);

    return <Chessboard options={{}} />;
};
