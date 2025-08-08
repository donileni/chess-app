import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { Header } from "@/components/shared/header/header";

const RootComponent = () => {
    const isDev = import.meta.env?.DEV ?? false;

    return (
        <SidebarProvider>
            <AppSidebar />
            <Header>
                <Outlet />
            </Header>
            {isDev ? <TanStackRouterDevtools /> : null}
        </SidebarProvider>
    );
};

export const Route = createRootRoute({
    component: () => <RootComponent />,
});
