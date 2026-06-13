FROM node:24-alpine AS build

WORKDIR /repo

ARG VITE_PUBLIC_BASE_PATH=/remotes/cart/

ENV VITE_PUBLIC_BASE_PATH=$VITE_PUBLIC_BASE_PATH

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps ./apps
COPY packages ./packages
COPY test ./test

RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @mfe-practice/cart build

FROM nginx:stable-alpine AS runtime

COPY apps/cart/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/apps/cart/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

