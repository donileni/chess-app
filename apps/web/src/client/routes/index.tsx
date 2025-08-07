import { ChessBoard } from "@/chess-board";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <>
            <div>Welcome to homepage "/"!</div>
            <ChessBoard />
            <Button style={{ margin: 10 }}>click me</Button>
        </>
    );
}
