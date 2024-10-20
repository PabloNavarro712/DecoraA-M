import globals from "globals";
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"], // Extensiones soportadas
    languageOptions: {
      globals: globals.browser, // Globales de navegador (puedes cambiarlas según tu entorno)
      parser: tsParser, // Parser para TypeScript y JavaScript moderno
      parserOptions: {
        ecmaVersion: 2021, // Para soportar las características modernas de ECMAScript
        sourceType: "module", // Para habilitar los módulos ES6
      },
    },
    plugins: {
      "@typescript-eslint": tseslint, // Plugin de TypeScript
    },
    rules: {
      "no-unused-vars": "warn", // Ejemplo de regla para variables no usadas
      "@typescript-eslint/no-unused-vars": "warn", // Aplica la misma regla para TypeScript
      "no-console": "off", // Permite el uso de console.log
    },
  },
  js.configs.recommended, // Configuración recomendada de ESLint para JavaScript
  tseslint.configs.recommended, // Configuración recomendada de ESLint para TypeScript
];
