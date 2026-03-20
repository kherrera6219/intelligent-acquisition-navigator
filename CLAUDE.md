# CLAUDE.md — Intelligent Acquisition Navigator

## Project Overview

**Intelligent Acquisition Navigator** is an AI-powered federal acquisition workflow management system. It assists acquisition professionals with FAR/DFARS compliance checking, solicitation review, market research, and document control. The UI integrates Azure OpenAI (GPT-4o) and Pinecone vector search for intelligent, citation-backed guidance.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 18.3.1 |
| Build tool | Vite 5.4.1 (SWC transpiler) |
| Language | TypeScript 5.5.3 |
| Styling | Tailwind CSS 3.4.11 + shadcn/ui (Radix UI) |
| State/data | TanStack Query v5 (React Query) |
| Backend | Supabase (PostgreSQL + Auth + Realtime) |
| AI/LLM | Azure OpenAI (GPT-4o, `@azure/openai`) |
| Vector DB | Pinecone (`@pinecone-database/pinecone`) |
| Routing | React Router v6 |
| Forms | react-hook-form + Zod |
| Animations | Framer Motion |
| Charts | Recharts |
| Icons | lucide-react |

---

## Repository Structure

```
src/
├── App.tsx                   # Root component — routing, providers, error boundary
├── main.tsx                  # ReactDOM entry point
├── components/
│   ├── ui/                   # shadcn/ui primitives + custom universals
│   ├── auth/                 # Authentication forms
│   ├── chat/                 # Chat UI components
│   ├── knowledge/            # Knowledge base components
│   ├── landing/              # Landing page components
│   ├── layout/               # MainLayout, PageHeader, DashboardCard
│   ├── navigation/           # Nav menus
│   └── sections/             # Landing page sections
├── config/
│   └── navigationItems.ts    # Centralized nav config (icons + permissions)
├── constants/
│   └── chatOptions.ts        # Role labels, agency regulations, detail levels
├── data/
│   ├── performanceData.ts    # Performance metrics for charts
│   └── sectionData.tsx       # Landing page section content
├── hooks/
│   ├── useAzureAI.ts         # TanStack mutation wrapper for Azure AI
│   ├── useQueryWithCache.ts  # Cache-aware data fetching
│   ├── use-loading-state.ts  # Loading state management
│   ├── useAudit.ts           # Audit logging hook
│   └── use-toast.ts          # Toast notification hook
├── integrations/
│   └── supabase/
│       ├── client.ts         # Supabase client (URL + anon key)
│       └── types.ts          # Auto-generated Supabase DB types
├── lib/
│   ├── utils.ts              # `cn()` class-name utility (clsx + tailwind-merge)
│   ├── apiClient.ts          # Generic typed HTTP client (get/post/put/delete)
│   ├── audit.ts              # Centralized audit logging system
│   ├── error/
│   │   └── ErrorBoundary.tsx # React error boundary
│   ├── security/
│   │   ├── accessControl.ts  # RBAC — 6 roles, 15-min session timeout
│   │   └── errorTracking.ts  # Global error tracking, security incident detection
│   └── validation/
│       └── forms.ts          # Reusable Zod validation schemas
├── pages/
│   ├── Index.tsx             # Landing page
│   ├── Dashboard.tsx         # Authenticated dashboard
│   ├── Chat.tsx              # Main AI chat interface
│   ├── KnowledgeBase.tsx     # Document/knowledge management
│   ├── Proposals.tsx         # Proposal tracking
│   ├── acquisition/
│   │   ├── SolicitationReview.tsx
│   │   ├── MarketResearch.tsx
│   │   └── DocumentControl.tsx
│   └── api/
│       └── azure-ai.ts       # POST /api/azure-ai — AI completion endpoint
├── providers/
│   ├── QueryProvider.tsx     # TanStack Query setup (5-min stale, 30-min cache)
│   └── AccessibilityProvider.tsx
├── services/
│   ├── azure/
│   │   └── aiService.ts      # Azure OpenAI completions + FAR citation extraction
│   ├── llm/
│   │   ├── masterLLM.ts      # LLM response orchestration
│   │   └── complianceLLM.ts  # Compliance-specific prompts + validation
│   ├── rag/
│   │   └── vectorStore.ts    # Pinecone vector store operations
│   ├── reasoning/
│   │   ├── ReasoningEngine.ts # Compliance reasoning workflow
│   │   ├── aiService.ts      # AI wrapper for reasoning tasks
│   │   └── reasoningDb.ts    # Persist reasoning results to Supabase
│   └── code-analysis.ts      # Python → TypeScript conversion utility
└── types/
    ├── acquisition.ts        # FAR citations, solicitation docs, market research
    ├── chat.ts               # Messages, roles, agency regulations, detail levels
    ├── reasoning.ts          # Reasoning steps, compliance checks, workflow states
    ├── knowledge.ts          # Knowledge base entities
    ├── code-conversion.ts    # Code conversion types
    └── akf.ts                # Acquisition Knowledge Framework types
```

---

## Development Commands

```bash
npm run dev          # Start dev server at http://localhost:8080
npm run build        # Production build → dist/
npm run build:dev    # Development-mode build
npm run lint         # ESLint check
npm run preview      # Preview production build locally
```

> **Note:** Both `npm` and `bun` are supported (both lockfiles are present).

**No test runner is configured.** There are no Jest/Vitest/RTL test files. If adding tests, set up Vitest (it integrates directly with the existing Vite config).

---

## Key Conventions

### TypeScript

- **Path alias**: `@/*` maps to `src/*`. Always use `@/` imports, never relative paths from deep directories.
- Strict mode is partially relaxed: `noImplicitAny: false`, `strictNullChecks: false`. Avoid relying on these relaxations in new code — prefer explicit types.
- Allow JS is enabled (`allowJs: true`) for interop, but write new code in TypeScript.

### Components

- Use **shadcn/ui** primitives from `@/components/ui/` for all standard UI elements (Button, Card, Dialog, Input, etc.). Do not install duplicate UI libraries.
- The `cn()` utility from `@/lib/utils` combines `clsx` + `tailwind-merge`. Use it for all conditional class names.
- Custom universal components (`GradientButton`, `GlassCard`, `GradientText`) live in `src/components/ui/`.
- Follow the file naming convention: `PascalCase.tsx` for components, `camelCase.ts` for utilities.

### Styling

- Use **Tailwind CSS** utility classes. CSS modules or inline styles are not used.
- Brand colors are defined in `tailwind.config.ts`:
  - Primary (deep blue): `#0066CC`
  - Secondary (emerald green): `#00A86B`
  - Accent (orange): `#FFA500`
- Dark mode is supported via the `dark` CSS class.
- Custom fonts: `Roboto` (headings), `Open Sans` (body), `Roboto Mono` (code).

### State & Data Fetching

- All server state goes through **TanStack Query** (`useQuery`, `useMutation`). Do not use `useEffect` + `fetch` directly for data fetching.
- Query defaults (set in `QueryProvider.tsx`): stale=5min, cache=30min, retry=2, no refetch on focus/mount.
- The `useAzureAI` hook wraps AI calls as a mutation — use it for chat completions in components.
- Local/UI state uses `useState`/`useReducer` as appropriate.

### Forms

- Use **react-hook-form** + **Zod** for all forms. Validation schemas go in `@/lib/validation/forms.ts` or co-located with the form component.
- Resolver: `@hookform/resolvers/zod`.

### Routing

- Routes are defined in `src/App.tsx` using React Router v6 (`BrowserRouter` + `<Route>`).
- Add new routes in `App.tsx`. Keep route paths consistent with the navigation config in `src/config/navigationItems.ts`.

### AI / LLM Integration

- All Azure OpenAI calls go through `@/services/azure/aiService.ts`.
  - Endpoint: `https://knowledgedev2443059259.services.ai.azure.com/`
  - Deployment: `gpt-4o`
  - Functions: `getAICompletion()`, `getResearchCompletion()` (with FAR citation extraction)
- The **Reasoning Engine** (`@/services/reasoning/ReasoningEngine.ts`) orchestrates multi-step compliance workflows with these states: `QUERY_PARSING → REASONING → COMPLIANCE_CHECK → CONCLUSION`.
- RAG queries use **Pinecone** via `@/services/rag/vectorStore.ts`.
- Do not add hardcoded API keys. The Azure key is passed at runtime.

### Security & Access Control

- **RBAC** is implemented in `@/lib/security/accessControl.ts` — 6 roles with permission matrices and a 15-minute session timeout.
- Always route sensitive operations through `accessControl` checks before executing.
- **Audit logging** (`@/lib/audit.ts`) must be called for all authentication events, data changes, and errors. Falls back to localStorage if the API is unavailable.
- Security incidents are auto-detected by `errorTracking.ts` via keyword matching (unauthorized, injection, XSS, etc.).
- The `ErrorBoundary` component (`@/lib/error/ErrorBoundary.tsx`) wraps the full app — integrate with it, don't bypass it.

### API Client

- Use `@/lib/apiClient.ts` (`APIClient` class) for HTTP calls, not raw `fetch`.
- Methods available: `get<T>()`, `post<T>()`, `put<T>()`, `delete<T>()`.
- The `/api/azure-ai` POST endpoint accepts `{ messages: Array<{role, content}> }`.

### Domain Types

Core domain types to understand before modifying acquisition features:

| File | Key Types |
|---|---|
| `types/acquisition.ts` | `FARCitation`, `SolicitationDocument`, `MarketResearch`, `DocumentAttachment` |
| `types/chat.ts` | `Message`, `AcquisitionRole` (7 roles), `AgencyRegulation` (29 supplements), `DetailLevel` |
| `types/reasoning.ts` | `ReasoningStep`, `ComplianceCheck`, `ReasoningResult`, `WorkflowState` |
| `types/akf.ts` | Acquisition Knowledge Framework components |

### Supabase

- Client is initialized in `@/integrations/supabase/client.ts`. Import it from there — do not create new clients.
- Database types are auto-generated in `@/integrations/supabase/types.ts`. Regenerate after schema changes with the Supabase CLI.
- Auth uses Supabase's built-in auth (`supabase.auth.*`).
- Known tables: `chat_messages`, `audit_logs`, `reasoning_results`.

---

## Environment & Configuration

### Hardcoded (public) credentials

These are intentionally public (Supabase anon key, public URL):

```
Supabase URL:     https://bosxxgbinzcjgwjaotyb.supabase.co
Supabase project: bosxxgbinzcjgwjaotyb
Azure endpoint:   https://knowledgedev2443059259.services.ai.azure.com/
Azure deployment: gpt-4o
```

### Secret credentials

The Azure OpenAI **API key** and **Pinecone API key** must be provided at runtime (never commit them).

### Vite dev server

- Runs on port **8080** (`::` / all interfaces, IPv6).
- The `lovable-tagger` plugin runs only in dev mode for component labeling.

---

## Architecture Notes

- **No SSR** — this is a client-side React SPA. The Vite `pages/api/` directory is a convention borrowed from Next.js but rendered client-side.
- **No test suite** exists currently. Tests should be added with Vitest (already Vite-compatible, no extra config needed beyond installing the package).
- **No CI/CD** pipelines exist. Deployments are manual via the GPT Engineer platform or Netlify.
- The project was bootstrapped via **GPT Engineer** and has since been extended manually.
- `bun.lockb` and `package-lock.json` are both committed. Prefer `npm` for consistency unless the team has standardized on `bun`.

---

## Common Pitfalls

1. **Do not bypass the `APIClient`** — raw fetch in components breaks centralized error handling and audit logging.
2. **Do not skip audit logging** for auth and data mutation events — it is a compliance requirement for this domain.
3. **TypeScript null safety is relaxed** — even though `strictNullChecks: false`, write null-safe code explicitly to avoid runtime errors.
4. **Tailwind class order matters** when using `cn()` with conflicting classes — `tailwind-merge` resolves conflicts (last wins), so put overrides last.
5. **Supabase types are auto-generated** — edit the database schema via Supabase migrations, then regenerate `types.ts`, not the other way around.
6. **Azure AI calls are async and rate-limited** — always handle loading and error states in components using the `useAzureAI` hook patterns.
