import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";

const RootComponent = () => {
    const isDev = import.meta.env?.DEV ?? false;

    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                <Outlet />
            </main>
            {isDev ? <TanStackRouterDevtools /> : null}
        </SidebarProvider>
    );
};

export const Route = createRootRoute({
    component: () => <RootComponent />,
});
