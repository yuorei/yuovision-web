回答は必ず日本語で答えて下さい。

# Repository Guidelines

## Project Structure & Module Organization
The app router lives in `src/app`, with route groups for auth (`login`, `register`), content (`video`, `channel`), and static info pages. Shared UI sits in `src/app/components`, primitives under `components/ui`, and domain helpers in `src/app/lib`. Apollo/auth providers live in `src/app/providers`. Generated GraphQL artifacts stay in `src/app/gql/`, and public assets in `public/`. Docker files, the `Makefile`, and `codegen.ts` remain at the repo root.

## Build, Test, and Development Commands
`npm run dev` (or `make dev`) starts the Next.js dev server on :3000 with hot reload. `npm run build` compiles a production bundle; `npm run start` serves that output and powers Docker/`make prod`. `npm run lint` runs the Next.js ESLint preset. `npm run generate` executes GraphQL Codegen to refresh `src/app/gql`. Use `make docker-run-dev` or `make docker-run-prod` when validating containerized workflows.

## Coding Style & Naming Conventions
TypeScript strict mode is enforced (see `tsconfig.json`), so fix type errors rather than casting away. Use 2-space indentation, double quotes, and PascalCase component exports that mirror their file names (kebab-case directories are fine). Favor functional components with hooks, colocate CSS modules when Tailwind utilities are insufficient, and import via the `@/` alias to avoid brittle relative paths. Run `npm run lint` before opening a PR to satisfy the Next.js plugin, accessibility checks, and Tailwind class ordering.

## Testing Guidelines
Automated tests are being introduced now; place `.test.tsx` files beside the component under test and use React Testing Library with mocked Apollo providers. Prefer behavior assertions (visible text, fired mutations) over implementation details. Document manual checks for complex flows such as video playback or Firebase auth, and include the exact URLs exercised.

## Commit & Pull Request Guidelines
History shows short imperative subjects (e.g., `Enhance video display`, `next 16.0.7`) with optional bodies. Follow that pattern, reference related issues (`fix/…`, `feature/…` branches), and keep subjects under ~65 characters. PRs should explain intent, list commands run, attach screenshots for UI shifts, call out `.env` or schema updates, and confirm `npm run lint` plus `npm run generate` were executed.

## Configuration & Security Tips
All secrets belong in `.env.local`; never commit Firebase configs or service-account files. Keep Docker images aligned with the Node version shipped by Next.js, and verify analytics (`src/app/lib/gtag.ts`) and Firebase helpers fail gracefully when env vars are missing so preview deployments stay stable.
