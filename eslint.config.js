import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "node_modules",
      // shadcn/ui generated components — do not lint
      "src/components/ui/**",
      // Tailwind config uses require() for plugins
      "tailwind.config.ts",
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Warn on console usage — use errorTracker or auditLogger instead
      "no-console": ["warn", { allow: ["warn"] }],
      // Security: prevent eval-based code execution
      "no-eval": "error",
      "no-implied-eval": "error",
      // Catch unused vars (except vars prefixed with _)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
      // Discourage unsafe any usage
      "@typescript-eslint/no-explicit-any": "warn",
    },
  }
);
