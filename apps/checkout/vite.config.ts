/// <reference types="vitest" />
import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  return {
    base: env.VITE_PUBLIC_BASE_PATH ?? "/",
    plugins: [
      react(),
      federation({
        name: "checkout",
        manifest: true,
        exposes: {
          "./CheckoutPage": "./src/CheckoutPage.tsx"
        },
        shared: {
          react: { singleton: true },
          "react-dom": { singleton: true }
        }
      })
    ],
    server: {
      port: 5176,
      strictPort: true,
      host: "127.0.0.1",
      origin: "http://localhost:5176"
    },
    preview: {
      port: 5176,
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
  };
});
