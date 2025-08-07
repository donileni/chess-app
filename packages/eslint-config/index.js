import javascript from "./javascript.js";
import reactConfig from "./react.js";
import typescriptConfig from "./typescript.js";
import prettierConfig from "./prettier.js";
import { defineConfig, globalIgnores } from "eslint/config";

const ignorePatterns = [
    "**/dist",
    "**/build",
    "**/*wasm*",
    "**/node_modules",
    "**/coverage",
    "**/.turbo",
];

export const web = defineConfig(
    ...reactConfig,
    ...typescriptConfig,
    ...prettierConfig,
    ...javascript,
    globalIgnores(ignorePatterns)
);

export const library = defineConfig(
    ...typescriptConfig,
    ...prettierConfig,
    ...javascript,
    globalIgnores(ignorePatterns)
);
