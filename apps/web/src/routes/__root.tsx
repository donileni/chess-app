import { AppSidebar } from "@/components/shared/app-sidebar";
import { Header } from "@/components/shared/header/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootComponent = () => {
    const isDev = import.meta.env?.DEV ?? false;

    return (
        <SidebarProvider>
            <AppSidebar />
            <Header>
                <Outlet />
            </Header>
            {isDev ? <TanStackRouterDevtools position="bottom-right" /> : null}
        </SidebarProvider>
    );
};

export const Route = createRootRoute({
    component: () => <RootComponent />,
});
