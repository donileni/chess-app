import { createRoot } from "react-dom/client";
import { createRouter, Navigate, RouterProvider } from "@tanstack/react-router";
import "./style.css";
import { routeTree } from "@/routeTree.gen";

const router = createRouter({
    routeTree,
    defaultNotFoundComponent: () => <Navigate to="/overview" />,
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const App = () => <RouterProvider router={router} />;

createRoot(document.getElementById("app")!).render(<App />);
