import { PageContainer } from "@/components/shared/page-container";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(container)")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <PageContainer>
            <Outlet />
        </PageContainer>
    );
}
