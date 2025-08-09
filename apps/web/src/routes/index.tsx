import { ChessBoard } from "@/components/chess/chess-board";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Index,
    loader: async () => {
        throw redirect({ to: "/overview" });
    },
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
