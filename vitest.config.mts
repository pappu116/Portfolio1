import { defineConfig } from "vitest/config";

// Vitest runs the pure logic in lib/ (escaping, profile derivation, GitHub
// mapping, contact validation). The `@/` alias mirrors tsconfig.json so tests
// import modules exactly the way the app does.
export default defineConfig({
  resolve: {
    alias: {
      "@": import.meta.dirname,
    },
  },
  test: {
    include: ["lib/**/*.test.ts"],
    environment: "node",
  },
});
