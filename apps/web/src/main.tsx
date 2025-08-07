import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "@/client/routeTree.gen";

const router = createRouter({
    routeTree,
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const App = () => <RouterProvider router={router} />;

createRoot(document.getElementById("app")!).render(<App />);
