/// <reference types="vitest" />
import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        catalog: "catalog@http://localhost:5174/mf-manifest.json",
        cart: "cart@http://localhost:5175/mf-manifest.json",
        checkout: "checkout@http://localhost:5176/mf-manifest.json"
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true }
      }
    })
  ],
  server: {
    port: 5173,
    strictPort: true,
    host: "127.0.0.1"
  },
  preview: {
    port: 5173,
    strictPort: true,
    host: "127.0.0.1"
  },
  test: {
    environment: "jsdom",
    setupFiles: "../../test/setup.ts",
    globals: true
  }
});
