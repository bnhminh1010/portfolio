# Bình Minh — DevOps Engineer Portfolio

A recruiter-facing portfolio for containerization, CI/CD, Linux infrastructure and reliable delivery. Personal content follows the current DevOps CV; project claims are checked against their repositories.

## Live routes

- **Portfolio (EN/VI):** [https://binhminh.thinkai.id.vn](https://binhminh.thinkai.id.vn)
- **DevOps CV:** [https://binhminh.thinkai.id.vn/cv](https://binhminh.thinkai.id.vn/cv)

## Stack and behaviour

- **Framework:** [Next.js](https://nextjs.org) 16 with React 19
- **Styling:** Tailwind CSS 4 and a locked CSS token system in [`design.md`](./design.md)
- **Language:** TypeScript; English is default with a Vietnamese toggle stored locally
- **Project evidence:** HomeLab Dashboard and ThinkAI Backend are presented as repository-backed case studies; diagrams are explicitly labelled demonstrations, never live telemetry
- **OpenScreen previews:** each case study has an accessible preview dialog ready for a 20–30 second MP4/WebM recording and poster. Record with demo data only; redact hostnames, identities, internal URLs and secrets before publishing.
- **Delivery:** Vercel Git Integration creates previews for pull requests and production deployments from `main`. GitHub Actions owns quality and security checks only.

## 📥 Local Development

Use Node 24 (see [`.nvmrc`](./.nvmrc)). Clone the repository and install the lockfile exactly:

```bash
# Install dependencies
npm ci

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## CV

`/cv` and the legacy `/cv/backend` route redirect to the current single-page DevOps PDF. Other old specialist CV routes were intentionally removed.

## Engineering controls

- [Architecture](./docs/architecture.md)
- [Deployment and rollback runbook](./docs/runbooks/deployment.md)
- [Security policy](./SECURITY.md)
- [Contribution guide](./CONTRIBUTING.md)

## 📄 License
This project is open-source and available under the MIT License.
