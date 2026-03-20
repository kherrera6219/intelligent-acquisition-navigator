# Contributing to ProcurityIQ

Thank you for taking the time to contribute! This guide covers how to set up a development environment, the branching strategy, coding conventions, and the PR process.

---

## Table of Contents

1. [Development Setup](#development-setup)
2. [Branching Strategy](#branching-strategy)
3. [Coding Conventions](#coding-conventions)
4. [Commit Messages](#commit-messages)
5. [Pull Request Process](#pull-request-process)
6. [Running Checks Locally](#running-checks-locally)
7. [Project-Specific Rules](#project-specific-rules)

---

## Development Setup

```bash
# 1. Fork the repo and clone your fork
git clone https://github.com/<your-username>/intelligent-acquisition-navigator.git
cd intelligent-acquisition-navigator

# 2. Install dependencies
npm install

# 3. Configure your environment
cp .env.example .env.local
# Edit .env.local — at minimum set VITE_ANTHROPIC_API_KEY

# 4. Start the dev server
npm run dev   # → http://localhost:8080
```

There is **no backend to run separately**. The app connects to a shared Supabase project using the pre-filled anon key. All database writes are subject to Row Level Security policies.

---

## Branching Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Stable, production-ready code |
| `develop` | Integration branch for completed features |
| `feature/<short-description>` | New features and improvements |
| `fix/<short-description>` | Bug fixes |
| `docs/<short-description>` | Documentation only |
| `chore/<short-description>` | Build, deps, config (no production code change) |

All changes merge into `develop` via PR. `develop` is merged to `main` for releases.

**Never push directly to `main`.**

---

## Coding Conventions

### TypeScript

- Use explicit types — avoid `any`. When an `any` cast is genuinely necessary (e.g., Supabase tables not yet in the generated types), add `// eslint-disable-next-line @typescript-eslint/no-explicit-any` with a comment explaining why.
- Prefer `unknown` over `any` for catch blocks and external data.
- Use the `@/` path alias for all imports — never use deep relative paths (`../../`).

### React

- Functional components only — no class components.
- Co-locate component state. Only lift state when two siblings genuinely need it.
- Use `useRef` for timers/intervals and clean them up in `useEffect` return functions.
- All data fetching through TanStack Query (`useQuery` / `useMutation`). No `useEffect` + `fetch`.

### Styling

- Tailwind CSS utility classes only. No inline styles, no CSS modules.
- Use the `cn()` helper from `@/lib/utils` for conditional class names.
- Follow the existing dark-theme design system — don't introduce new colour values; use Tailwind tokens.

### AI calls

- All Claude calls go through `getAICompletion()` in `@/services/azure/aiService.ts`.
- Structured LLM outputs must be validated with Zod schemas before use in business logic.
- Never surface raw AI errors to users — always map to a user-friendly message.

### Security

- Gate all write operations behind `accessControl.hasPermission()`.
- Log all auth events and data mutations via `auditLogger.log()`.
- Validate file type and size **before** upload (see `DocumentControl.tsx` for the pattern).

---

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <short summary>

[optional body]
```

| Type | When to use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `chore` | Build scripts, deps, config |
| `refactor` | Code change that is not a fix or feature |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |

**Examples:**

```
feat(proposals): add parallel AI section generation with Promise.allSettled
fix(auth): clear session monitor interval on logout
docs: update README with environment variable reference
chore: remove unused @azure/openai and date-fns dependencies
```

---

## Pull Request Process

1. **Branch**: create a `feature/` or `fix/` branch from `develop`.
2. **Implement**: make your changes; add or update tests if a test suite is present.
3. **Lint**: run `npm run lint` — PRs must have **zero ESLint errors**.
4. **Build**: run `npm run build` — PRs must produce a clean production build.
5. **PR title**: follow Conventional Commits format.
6. **PR description**: fill in the template (summary, test plan, screenshots for UI changes).
7. **Review**: request review from at least one maintainer.
8. **Merge**: squash-merge into `develop` after approval.

---

## Running Checks Locally

```bash
# Lint (must be zero errors)
npm run lint

# Production build
npm run build

# Preview the production build
npm run preview
```

---

## Project-Specific Rules

1. **Never commit secrets** — `.env.local` is gitignored; `.env.example` contains only placeholders.
2. **No direct Supabase schema edits** — schema changes must be done via Supabase migrations and regenerate `src/integrations/supabase/types.ts` with `supabase gen types typescript`.
3. **New pages need routes** — add routes in `src/App.tsx` and navigation entries in `src/config/navigationItems.ts`.
4. **New Supabase tables need type-safe hooks** — add a `use<TableName>.ts` hook in `src/hooks/` following the pattern in `useSolicitations.ts`.
5. **Accessibility** — all interactive elements need `aria-label` or visible text labels; icons must have `aria-hidden="true"`.
