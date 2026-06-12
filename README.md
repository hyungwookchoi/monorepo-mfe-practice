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

