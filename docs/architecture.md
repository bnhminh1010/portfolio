# Architecture

The public application is a Next.js 16 portfolio deployed by Vercel Git Integration. The `main` branch is the production source; pull requests receive Vercel previews after GitHub quality and security checks pass.

## Trust boundary

- The public site has no runtime monitoring, secrets, operational API or simulated telemetry surface.
- Personal claims come from the DevOps CV. Repository evidence only explains the technical problem, decision and outcome behind a claim.
- OpenScreen media is optional evidence. It must contain demo data and redact hostnames, identities, internal URLs, tokens and secrets.

## Delivery contract

GitHub Actions validates linting, TypeScript, a production build, browser smoke scenarios, workflow syntax, dependency changes, dependency audit and CodeQL. Vercel owns preview and production deployment; deploy credentials are not stored in this repository.
