import globals from "globals";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";

export default [
    js.configs.recommended,
    {
        ignores: [
            "**/node_modules",
            "**/dist",
            "**/build",
            "**/coverage",
            "**/.github",
            "**/.*",
            "**/*.md",
            "**/*.config.{js,ts}",
        ],
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.jest,
                ...globals.node,
            },
            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",
        },
        rules: {
            "no-unused-vars": "off",
            "consistent-return": "off",
            "require-await": "off",
            "array-callback-return": "warn",
            "no-constant-condition": "warn",
            "no-duplicate-imports": "warn",
            "object-shorthand": "warn",
            "arrow-body-style": "warn",
            "no-unmodified-loop-condition": "warn",
            "no-redeclare": "off",
            "no-use-before-define": [
                "error",
                {
                    functions: false,
                    classes: false,
                    variables: true,
                    allowNamedExports: false,
                },
            ],

            "require-atomic-updates": "warn",
            complexity: ["warn", 15],
            "dot-notation": "warn",
            eqeqeq: ["error", "always"],
            "max-params": ["warn", 3],
            "no-else-return": "warn",
            "no-empty-function": "off",
            "no-lonely-if": "warn",
            "no-multi-assign": "warn",
            "no-nested-ternary": "error",
            "no-shadow": "warn",
            "no-unneeded-ternary": "warn",
            "no-useless-rename": "warn",
            "no-var": "error",
            "no-useless-return": "warn",
            "prefer-arrow-callback": "warn",
            "prefer-const": "warn",
            "prefer-template": "warn",

            "sort-imports": [
                "warn",
                {
                    ignoreCase: true,
                    ignoreDeclarationSort: true,
                    ignoreMemberSort: false,
                    memberSyntaxSortOrder: [
                        "none",
                        "all",
                        "multiple",
                        "single",
                    ],
                },
            ],
            "spaced-comment": [
                "warn",
                "always",
                {
                    markers: ["/"],
                },
            ],
            // "banjo/module-exports": "error",
            // "banjo/one-line-if": "off",
            "promise/always-return": "off",
        },
    },
];
