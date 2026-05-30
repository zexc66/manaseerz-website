const eslintConfig = defineConfig([
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
]);

export default eslintConfig;
