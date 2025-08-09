import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        tanstackRouter({
            routesDirectory: "./src/routes/",
            generatedRouteTree: "./src/routeTree.gen.ts",
            target: "react",
            autoCodeSplitting: true,
        }),
        react(),
        tsconfigPaths(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
