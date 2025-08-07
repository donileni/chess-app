import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
    {
        files: ["**/*.{js,jsx}"],
        plugins: { "react-hooks": reactHooks },
        rules: {
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
        },
    },
    {
        files: ["**/*.jsx", "**/*.tsx"],
        plugins: {
            react,
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            "react/button-has-type": "warn",
            "react/default-props-match-prop-types": "warn",
            "react/forbid-component-props": "off",
            "react/hook-use-state": "warn",
            "react/iframe-missing-sandbox": "warn",
            "react/jsx-boolean-value": "warn",
            "react/jsx-curly-brace-presence": [
                "warn",
                {
                    props: "never",
                    children: "never",
                    propElementValues: "always",
                },
            ],
            "react/jsx-handler-names": "warn",
            "react/jsx-no-bind": [
                "warn",
                {
                    allowArrowFunctions: true,
                },
            ],
            "react/jsx-no-constructed-context-values": "warn",
            "react/jsx-no-leaked-render": "warn",
            "react/jsx-no-script-url": "warn",
            "react/jsx-no-useless-fragment": "warn",
            "react/jsx-pascal-case": "warn",
            "react/jsx-props-no-spread-multi": "warn",
            "react/no-access-state-in-setstate": "warn",
            "react/no-arrow-function-lifecycle": "warn",
            "react/no-danger": "warn",
            "react/no-deprecated": "warn",
            "react/destructuring-assignment": [
                "warn",
                "always",
                {
                    destructureInSignature: "always",
                    ignoreClassFields: true,
                },
            ],
            "react/no-adjacent-inline-elements": "warn",
            "react/no-did-mount-set-state": "warn",
            "react/no-did-update-set-state": "warn",
            "react/no-multi-comp": "off",
            "react/no-namespace": "warn",
            "react/no-redundant-should-component-update": "warn",
            "react/no-this-in-sfc": "warn",
            "react/no-typos": "warn",
            "react/no-unsafe": "warn",
            "react/no-unused-prop-types": "warn",
            "react/no-unused-state": "warn",
            "react/no-will-update-set-state": "warn",
            "react/prefer-es6-class": "warn",
            "react/prefer-stateless-function": "warn",
            "react/require-optimization": "warn",
            "react/self-closing-comp": "warn",
            "react/sort-comp": "warn",
            "react/sort-default-props": "warn",
            "react/sort-prop-types": "warn",
            "react/style-prop-object": "warn",
            "react/void-dom-elements-no-children": "warn",
        },
    },
];
