import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootComponent = () => {
    const isDev = import.meta.env?.DEV ?? false;

    return (
        <>
            <Outlet />
            {isDev ? <TanStackRouterDevtools /> : null}
        </>
    );
};

export const Route = createRootRoute({
    component: () => <RootComponent />,
});
