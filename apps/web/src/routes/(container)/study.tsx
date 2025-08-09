import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(container)/study")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/(container)/study"!</div>;
}
