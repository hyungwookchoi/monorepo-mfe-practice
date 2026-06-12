/// <reference types="vitest" />
import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "cart",
      manifest: true,
      exposes: {
        "./CartWidget": "./src/CartWidget.tsx",
        "./CartPage": "./src/CartPage.tsx"
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true }
      }
    })
  ],
  server: {
    port: 5175,
    strictPort: true,
    host: "127.0.0.1",
    origin: "http://localhost:5175"
  },
  preview: {
    port: 5175,
    strictPort: true,
    host: "127.0.0.1"
  },
  build: {
    target: "esnext"
  },
  test: {
    environment: "jsdom",
    setupFiles: "../../test/setup.ts",
    globals: true
  }
});
