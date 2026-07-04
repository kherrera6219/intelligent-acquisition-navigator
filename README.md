# Intelligent Acquisition Navigator

Intelligent Acquisition Navigator is a React + TypeScript web app for federal acquisition workflows.  
It combines compliance-aware guidance, role-based UX, and AI-assisted reasoning for teams working with FAR/DFARS and agency supplements.

## Core capabilities

- AI-assisted acquisition chat with role and regulation context
- Solicitation review workflows (RFI/RFP/RFQ/SOW/PWS)
- Market research and document control pages
- Knowledge base and proposal management screens
- Compliance and reasoning pipeline with traceable outputs
- Self-contained local auth and data persistence

## Tech stack

- React 18, TypeScript, Vite
- Tailwind CSS + Radix UI + shadcn/ui
- TanStack React Query
- Azure OpenAI integration
- Local in-app retrieval for RAG context
- Vitest + Testing Library

## Getting started

### 1. Prerequisites

- Node.js 20+ recommended
- npm

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Copy `.env.example` to `.env.local` and set all required values:

```bash
cp .env.example .env.local
```

Required variables:

- `VITE_AZURE_ENDPOINT`
- `VITE_AZURE_OPENAI_API_KEY`

Optional client variables:

- `VITE_AZURE_DEPLOYMENT_ID`
- `VITE_AZURE_OPENAI_API_VERSION`
- `VITE_CONTACT_EMAIL`
- `VITE_CONTACT_PHONE`

### 4. Run the app

```bash
npm run dev
```

The dev server runs on `http://localhost:8080`.

## Scripts

- `npm run dev` - start dev server
- `npm run build` - create production build
- `npm run build:dev` - create development-mode build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint
- `npm run test` - run Vitest once
- `npm run test:watch` - run Vitest in watch mode
- `npm run test:coverage` - generate coverage report

## Project structure

```text
src/
  components/      UI and feature components
  pages/           Route-level pages
  services/        AI, RAG, reasoning, and integration logic
  hooks/           Reusable React hooks
  lib/             Shared utilities (audit, security, error handling)
  integrations/    External clients (Supabase)
  providers/       App-level providers
  config/          Navigation and app configuration
  types/           Shared TypeScript types

```

## Key routes

- `/` - landing page
- `/login`, `/signup`, `/reset-password` - auth flows
- `/dashboard`
- `/chat`
- `/knowledge-base`
- `/proposals`
- `/acquisition/solicitation-review`
- `/acquisition/market-research`
- `/acquisition/document-control`

## Testing

Run all tests:

```bash
npm run test
```

Run lint + tests before opening a PR:

```bash
npm run lint
npm run test
```

## Security and secrets

- Do not commit `.env.local`
- All `VITE_*` values are exposed to the browser bundle; use a scoped/rotated key for local app usage
- Rotate keys immediately if exposure is suspected

## Contributing

1. Create a feature branch from `main`
2. Make changes with tests where applicable
3. Run lint and tests
4. Open a pull request with a clear summary and validation notes
