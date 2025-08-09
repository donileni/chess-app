import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(container)/settings")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/(container)/settings"!</div>;
}
