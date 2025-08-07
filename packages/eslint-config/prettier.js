import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const config = [
    eslintPluginPrettierRecommended,
    {
        rules: {
            "max-len": "off",
        },
    },
];

export default config;
