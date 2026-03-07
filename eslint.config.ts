import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default tseslint.config(
  // 1. Global Ignores (Must be the first object without 'files' key)
  {
    ignores: ["dist/**", ".react-router/**", "build/**", "node_modules/**"],
  },

  // 2. Base JS Recommended
  js.configs.recommended,

  // 3. TypeScript Recommended
  ...tseslint.configs.recommended,

  // 4. React Recommended
  pluginReact.configs.flat.recommended,

  // 5. Your Custom Overrides
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Added node in case you have config files in the root
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
);
