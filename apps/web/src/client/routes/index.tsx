import { createFileRoute } from "@tanstack/react-router";
import { ChessBoard } from "../../chess-board";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <>
            <div>Welcome to homepage "/"!</div>
            <ChessBoard />
        </>
    );
}
