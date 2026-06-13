# ECS Deployment Notes

This example deploys each MFE as an independent ECS Fargate service behind one ALB.

## Public routes

```txt
https://shop.example.com/                    -> mfe-host-service
https://shop.example.com/remotes/catalog/*   -> mfe-catalog-service
https://shop.example.com/remotes/cart/*      -> mfe-cart-service
https://shop.example.com/remotes/checkout/*  -> mfe-checkout-service
```

The ALB should preserve the path prefix. Each remote image serves its build output under its `/remotes/<app>/` prefix.

## GitHub configuration

Repository secrets:

- `AWS_ROLE_TO_ASSUME`: IAM role ARN trusted by GitHub OIDC.

Repository variables:

- `AWS_REGION`: AWS region, for example `ap-northeast-2`.
- `ECS_CLUSTER`: ECS cluster name.
- `PUBLIC_ORIGIN`: public origin without a trailing slash, for example `https://shop.example.com`.

ECR repositories expected by `.github/workflows/deploy-ecs.yml`:

- `mfe-host`
- `mfe-catalog`
- `mfe-cart`
- `mfe-checkout`

## Task definitions

The JSON files in `infra/ecs/task-definitions` are templates. Replace these placeholders before the first real deployment:

- `ACCOUNT_ID`
- `REGION`
- `ecsTaskExecutionRole`
- app task role names if your IAM role names differ

The GitHub workflow replaces only the container image URI during deploy.

## ALB rules

Recommended priority order:

```txt
1. /remotes/catalog/*   -> catalog target group
2. /remotes/cart/*      -> cart target group
3. /remotes/checkout/*  -> checkout target group
4. /*                   -> host target group
```

Each ECS service should expose container port `80` and use `/healthz` for target group health checks.

## Deployment behavior

- PRs run lint, tests, production build, and Playwright e2e.
- Pushes to `main` run the same quality gate before deployment.
- The deploy workflow builds only affected images unless `workflow_dispatch.deploy_all` is true.
- Shared package changes in `packages/ui` or `packages/contracts` redeploy every affected MFE.
- Docker images are pushed as `<app>:<git-sha>` and `<app>:main-latest`.

