FROM node:24-alpine AS build

WORKDIR /repo

ARG VITE_CATALOG_REMOTE_URL=catalog@http://localhost:5174/mf-manifest.json
ARG VITE_CART_REMOTE_URL=cart@http://localhost:5175/mf-manifest.json
ARG VITE_CHECKOUT_REMOTE_URL=checkout@http://localhost:5176/mf-manifest.json

ENV VITE_CATALOG_REMOTE_URL=$VITE_CATALOG_REMOTE_URL
ENV VITE_CART_REMOTE_URL=$VITE_CART_REMOTE_URL
ENV VITE_CHECKOUT_REMOTE_URL=$VITE_CHECKOUT_REMOTE_URL

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps ./apps
COPY packages ./packages
COPY test ./test

RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @mfe-practice/host build

FROM nginx:stable-alpine AS runtime

COPY apps/host/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/apps/host/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

