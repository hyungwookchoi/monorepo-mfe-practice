# Monorepo MFE Practice

A small shopping demo for practicing monorepos and micro frontends with React, Vite, pnpm workspaces, Turbo, and Module Federation.

## Apps

- `apps/host`: shell app that loads every remote.
- `apps/catalog`: product list remote.
- `apps/cart`: cart state owner remote.
- `apps/checkout`: mock checkout remote.

## Packages

- `packages/contracts`: shared types and typed browser events.
- `packages/ui`: shared UI components and CSS.

## Ports

- Host: `http://localhost:5173`
- Catalog: `http://localhost:5174`
- Cart: `http://localhost:5175`
- Checkout: `http://localhost:5176`

## Commands

```sh
pnpm install
pnpm dev
pnpm build
pnpm test
pnpm e2e
```

The cart remote owns cart state. Other MFEs communicate with it through typed `CustomEvent` helpers exported by `@mfe-practice/contracts`.

## Production CI/CD Shape

This repo includes GitHub Actions, Dockerfiles, Nginx configs, and ECS task definition templates for a Docker + ECS deployment model.

- PR quality gate: `.github/workflows/ci.yml`
- Main branch deploy: `.github/workflows/deploy-ecs.yml`
- App Dockerfiles: `apps/*/Dockerfile`
- ECS templates and ALB notes: `infra/ecs/README.md`

Production uses one public origin with path-based routing:

```txt
https://shop.example.com/                    -> host
https://shop.example.com/remotes/catalog/    -> catalog remote
https://shop.example.com/remotes/cart/       -> cart remote
https://shop.example.com/remotes/checkout/   -> checkout remote
```

For production builds, host remote manifest URLs are configured with:

```sh
VITE_CATALOG_REMOTE_URL=catalog@https://shop.example.com/remotes/catalog/mf-manifest.json
VITE_CART_REMOTE_URL=cart@https://shop.example.com/remotes/cart/mf-manifest.json
VITE_CHECKOUT_REMOTE_URL=checkout@https://shop.example.com/remotes/checkout/mf-manifest.json
```
