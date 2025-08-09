import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(container)/overview")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/overview"!</div>;
}
