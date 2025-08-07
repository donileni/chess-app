import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        tanstackRouter({
            routesDirectory: "./src/client/routes/",
            generatedRouteTree: "./src/client/routeTree.gen.ts",
            target: "react",
            autoCodeSplitting: true,
        }),
        react(),
        tsconfigPaths(),
    ],
});
