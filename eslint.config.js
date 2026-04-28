import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"]
  },
  {
    ignores: ["dist"],
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      //"no-irregular-whitespace": "off",
      "no-restricted-imports": [
        "error", 
        {
          "patterns": [
            {
              "group": ["@/*"],
              "message": "No importes desde '@/*'. Para una mejor trazabilidad, opta por un alias de dominio."
            },
            {
              "group": ["../*/**", "../../*/**"],
              "message": "No cruces dominios con imports relativos. Usa '@modules/<dominio>'."
            },
            {
              "group": ["@/modules", "@/modules/*"],
              "message": "No importes desde '@/modules'. Para una mejor trazabilidad, opta por un alias de dominio ('@modules/<dominio>')."
            }
          ]
        }
      ]
    }
  },
];
