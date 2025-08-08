import { useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { ChessComService } from "@chess-app/chess";
// import Engine from "@/providers/engine";

// const DEFAULT_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const ChessBoard = () => {
    // const engine = useMemo(() => new Engine(), []);

    // useEffect(() => {
    //     engine.evaluatePosition(DEFAULT_FEN, 21);
    //     engine.onMessage((message) => {
    //         if (message.depth && message.depth < 10) return;
    //         console.log("Engine message:", message);
    //     });
    // }, []);

    useEffect(() => {
        ChessComService.fetchAllGames("banjoanton").then(console.log);
    });

    return <Chessboard options={{}} />;
};
