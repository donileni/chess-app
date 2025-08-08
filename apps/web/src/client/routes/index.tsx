import { ChessBoard } from "@/chess-board";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <div>
            <div className="m-2">Welcome to homepage "/"!</div>
            <div className="m-2">
                <ChessBoard />
            </div>
        </div>
    );
}
