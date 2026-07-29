# Contributing

## Local setup

Use Node 24 (`nvm use`) and install the lockfile exactly:

```bash
npm ci
npm run dev
```

## Before opening a pull request

```bash
npm run lint
npm run typecheck
npm run build
npm run test:smoke
```

Treat `main` as protected: submit a pull request, let the required checks pass, and do not bypass review for routine changes. The exact GitHub ruleset is documented in the deployment runbook.

Keep CV facts as the source of truth. Repository history may explain engineering context, but it must not inflate ownership or outcomes. Recordings and screenshots must use redacted demo data only.
