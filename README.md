# CI/CD Examples

A project designed for practical learning of **CI/CD (Continuous Integration / Continuous Delivery)** using **GitHub Actions**. The goal is to explore different pipeline automation scenarios, from linting and testing to automated deployments.

---

## About the Project

This repository contains examples of GitHub Actions workflows applied to a **Next.js** application, with deployment on **Vercel**. Each workflow demonstrates a common stage in CI/CD pipelines:

| Workflow | File | Description |
| --- | --- | --- |
| **CI** | `.github/workflows/ci.yml` | Runs linter, preview deployment, and E2E tests on pull requests |
| **CD** | `.github/workflows/cd.yml` | Automated deployment on push to `main` or `develop` |
| **Action Example** | `.github/workflows/action-example.yml` | Basic GitHub Action example |

## Structure

```text
.github/workflows/
  ├── ci.yml                 # Continuous integration pipeline
  ├── cd.yml                 # Continuous delivery pipeline
  └── action-example.yml     # Basic action example
scripts/
  └── pull-request-preview.js # Preview deployment script + PR comment
package.json
```

## Pipelines

### CI (`ci.yml`)

Triggered on **pull requests** that modify `.ts`, `.tsx`, `.js`, or `.jsx` files. Executes three jobs in sequence:

1. **Linter** — Runs `yarn lint` for static code validation
2. **Preview** — Builds and deploys preview to Vercel
3. **Test E2E** — Runs end-to-end tests with Cypress on Chrome

### CD (`cd.yml`)

Triggered on **push** to `main` and `develop` branches. Runs lint, build, and production deployment in a single job.

### Action Example (`action-example.yml`)

A simple example demonstrating the basic structure of a GitHub Actions workflow.

## Scripts

- **`deploy:preview`** — Executes staging deployment and automatically posts the preview URL as a comment on the pull request via GitHub API.
- **`deploy:staging`** — Build + deployment to Vercel staging environment.
- **`deploy:prod`** — Build + deployment to Vercel production environment.

## Technologies

- [GitHub Actions](https://docs.github.com/en/actions)
- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [Cypress](https://www.cypress.io/)
- [Yarn 4 (Berry)](https://yarnpkg.com/)

## How to Use

1. Fork this repository
2. Configure secrets on GitHub:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
3. Create a pull request or push to `main`/`develop` to see the workflows in action

## License

Project for learning purposes.
