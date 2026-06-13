/// <reference types="vitest" />
import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

const getRemote = (
  env: Record<string, string>,
  key: string,
  fallback: string
) => env[key] ?? fallback;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  return {
    plugins: [
      react(),
      federation({
        name: "host",
        remotes: {
          catalog: getRemote(
            env,
            "VITE_CATALOG_REMOTE_URL",
            "catalog@http://localhost:5174/mf-manifest.json"
          ),
          cart: getRemote(
            env,
            "VITE_CART_REMOTE_URL",
            "cart@http://localhost:5175/mf-manifest.json"
          ),
          checkout: getRemote(
            env,
            "VITE_CHECKOUT_REMOTE_URL",
            "checkout@http://localhost:5176/mf-manifest.json"
          )
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
  };
});
