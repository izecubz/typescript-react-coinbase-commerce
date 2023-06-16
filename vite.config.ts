import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";
import * as packageJson from "./package.json";

export default defineConfig(() => ({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      include: ["src"],
    }),
  ],
  server: {
    port: 4040,
  },
  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: "typescript-react-coinbase-commerce",
      formats: ["es", "cjs"],
      fileName: (format) =>
        `typescript-react-coinbase-commerce.${
          format === "cjs" ? "cjs" : "es.js"
        }`,
    },
    optimizeDeps: {
      exclude: Object.keys(packageJson.peerDependencies),
    },
    esbuild: {
      minify: true,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
}));
