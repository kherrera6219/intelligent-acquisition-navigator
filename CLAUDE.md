# CLAUDE.md — Intelligent Acquisition Navigator

Guidance for AI assistants working in this codebase.

## Project Overview

**Intelligent Acquisition Navigator** is a federal acquisition workflow management system with AI/LLM capabilities. It helps contracting professionals (Contract Specialists, Contracting Officers, Program Managers, etc.) navigate FAR/DFARS compliance, review solicitation documents, conduct market research, and get AI-powered acquisition guidance.

**Stack:** React 18 + TypeScript + Vite | Tailwind CSS + shadcn/ui | Azure OpenAI (GPT-4o) + Pinecone RAG | Supabase (PostgreSQL + Auth)

---

## Development Commands

```bash
npm run dev          # Start dev server on http://localhost:8080
npm run build        # Production build → dist/
npm run build:dev    # Development build
npm run lint         # ESLint validation (0 errors expected)
npm run preview      # Preview production build locally
npm run test         # Run test suite (Vitest)
npm run test:watch   # Vitest in watch mode
npm run test:coverage # Coverage report
```

> The dev server binds to `::` (all interfaces) on port **8080**.

### Package Manager

Use **npm**. `bun.lockb` is a legacy artifact and can be ignored.

---

## Environment Setup

**Required:** Copy `.env.example` to `.env.local` and fill in all values before running the app. Missing variables will cause an explicit startup error in development.

```
VITE_SUPABASE_URL          — Supabase project URL
VITE_SUPABASE_ANON_KEY     — Supabase anon/public key (rotate if exposed)
VITE_AZURE_ENDPOINT        — Azure OpenAI resource endpoint
VITE_AZURE_OPENAI_API_KEY  — Azure OpenAI API key
VITE_AZURE_DEPLOYMENT_ID   — Deployment name (default: gpt-4o)
VITE_PINECONE_API_KEY      — Pinecone API key (optional; RAG degrades gracefully without it)
VITE_PINECONE_INDEX_NAME   — Pinecone index (default: acquisition-knowledge-base)
VITE_CONTACT_EMAIL         — Contact page email (optional; falls back to default)
VITE_CONTACT_PHONE         — Contact page phone (optional; falls back to default)
```

> **Security:** Never commit `.env.local`. Secrets are validated at startup and must never be hardcoded in source files. The Supabase anon key committed prior to March 2026 has been rotated.

---

## Directory Structure

```
src/
├── components/          # React components
│   ├── auth/            # Login, signup, password reset UI
│   ├── chat/            # Chat interface components
│   ├── knowledge/       # Knowledge base components
│   ├── landing/         # Landing page sections (Hero, Features, etc.)
│   ├── layout/          # AppLayout, Sidebar, Header
│   ├── navigation/      # Navigation menus, breadcrumbs
│   ├── sections/        # Page section components
│   └── ui/              # shadcn/ui + custom universal components (NOT linted)
│       └── universal/   # Custom wrappers: Card, Grid, Container, GradientButton, etc.
├── pages/               # Route-level page components
│   ├── acquisition/     # SolicitationReview, MarketResearch, DocumentControl
│   ├── Dashboard.tsx
│   ├── Chat.tsx
│   ├── KnowledgeBase.tsx
│   ├── Proposals.tsx
│   └── Index.tsx        # Landing page
├── services/            # Business logic & external integrations
│   ├── azure/           # Azure OpenAI GPT-4o (aiService.ts)
│   ├── llm/             # masterLLM.ts (orchestrator), complianceLLM.ts
│   ├── rag/             # vectorStore.ts — Pinecone integration
│   └── reasoning/       # ReasoningEngine.ts, aiService.ts, reasoningDb.ts
├── hooks/               # Custom React hooks
│   ├── useAzureAI.ts    # Mutation hook — direct Azure calls + 3-attempt retry/backoff
│   ├── useAudit.ts      # Audit logging hook
│   └── useQueryWithCache.ts
├── types/               # TypeScript interfaces (never inline in components)
│   ├── acquisition.ts   # FAR citations, solicitations, market research
│   ├── chat.ts          # Message, role/regulation/detail context
│   ├── reasoning.ts     # Compliance rules, reasoning steps
│   ├── knowledge.ts     # Knowledge domains, AI analysis records
│   └── akf.ts           # Advanced Knowledge Framework
├── lib/                 # Utilities and cross-cutting concerns
│   ├── apiClient.ts     # HTTP client wrapper
│   ├── audit.ts         # auditLogger singleton (falls back to localStorage)
│   ├── utils.ts         # General helpers (cn(), etc.)
│   ├── error/           # ErrorBoundary component
│   ├── security/        # accessControl.ts, errorTracking.ts
│   └── validation/      # forms.ts — Zod validation schemas
├── test/                # Test setup
│   └── setup.ts         # @testing-library/jest-dom setup
├── integrations/
│   └── supabase/
│       ├── client.ts    # Supabase client — reads from VITE_SUPABASE_* env vars
│       └── types.ts     # Auto-generated DB types — DO NOT EDIT MANUALLY
├── providers/
│   └── QueryProvider.tsx  # React Query + global error handling
├── config/
│   └── navigationItems.ts # Role-gated nav menu definitions
├── constants/
│   └── chatOptions.ts   # Acquisition roles and agency regulation enums
├── data/                # Static data (charts, section content)
├── styles/              # Global CSS (global.css, application.css, index.css)
├── App.tsx              # Root component with per-route ErrorBoundary wrapping
└── main.tsx             # Entry point + env variable validation
```

---

## Architecture

### Component Hierarchy

```
App.tsx  (global ErrorBoundary)
└── QueryProvider
    └── TooltipProvider
        └── BrowserRouter
            └── MainLayout (layout/MainLayout.tsx)
                └── <Route> each wrapped in <ErrorBoundary fallback={PageErrorFallback}>
                    └── Page Components (pages/)
                        └── Feature Components (components/)
                            └── UI Primitives (components/ui/)
```

### State Management

| Concern | Tool |
|---|---|
| Server/async state | TanStack React Query (5-min stale, 30-min cache) |
| Form state | React Hook Form + Zod (`zodResolver`) |
| Local UI state | `useState` / `useReducer` |
| Global context | Context providers (QueryProvider, TooltipProvider) |

### AI / LLM Pipeline

```
User Query
  → useAzureAI hook (3-attempt exponential backoff: 2s → 4s → 8s)
  → masterLLM.ts (orchestrator — real Azure GPT-4o call, JSON-structured response)
  → ReasoningEngine.ts (multi-step reasoning — analytical/inductive/deductive templates)
  → complianceLLM.ts (FAR/agency compliance check — real Azure GPT-4o call)
  → vectorStore.ts (Pinecone RAG — gracefully degrades to empty matches if unconfigured)
  → Conclusion with FAR citations stored in Supabase reasoning_results table
```

> **AI Services:** All LLM calls go through `getAICompletion()` in `src/services/azure/aiService.ts`.
> There is no backend proxy — calls are made browser-side using the Azure SDK.
> The dead `src/pages/api/azure-ai.ts` Express route has been removed.

### Data Flow

```
Pages → Custom Hooks (useAzureAI, etc.) → Services → External APIs
                                        ↓
                              Supabase (PostgreSQL + Auth)
```

---

## Key Conventions

### Imports

Always use the `@/` alias for `src/` imports — never relative paths from outside the same directory:

```typescript
// Correct
import { Button } from "@/components/ui/button";
import { auditLogger } from "@/lib/audit";

// Avoid
import { Button } from "../../../components/ui/button";
```

### Components

- **Functional components only** — no class components
- **PascalCase** for component files and names
- Co-locate component-specific types in the same file; shared types go in `src/types/`
- Prefer the `universal/` wrappers (Card, Grid, GradientButton) over raw shadcn/ui for consistent styling
- Every list/table component must include an **empty state** UI when there are no items

### Accessibility (a11y)

- All icon-only buttons require `aria-label`
- All decorative SVGs and icons require `aria-hidden="true"`
- All search inputs require `aria-label`
- Status badges use `role="status"` and `aria-label`
- Form fields use `htmlFor` + `id` pairing and `aria-describedby` for error messages
- Error messages use `role="alert"`

### Styling

- **Tailwind utility classes only** — no custom CSS in component files
- Dark mode via `dark:` variants (class-based, `darkMode: ["class"]`)
- Custom design tokens defined in `tailwind.config.ts`:
  - Primary: `#0066CC` (Deep Blue)
  - Secondary: `#00A86B` (Emerald Green)
  - Accent: `#FFA500` (Orange)
- Animations: Framer Motion for page transitions; Tailwind keyframes (`fade-up`, `fade-in`, `scale-in`) for UI
- **Do not use `pl-64` or other hardcoded sidebar offsets** — use `md:pl-64` for responsive safety

### TypeScript

- All shared interfaces live in `src/types/` and are named exports
- `src/integrations/supabase/types.ts` is **auto-generated** — do not edit manually; regenerate via Supabase CLI
- Path aliases: `@/*` → `./src/*`
- `noImplicitAny: true` and `strictNullChecks: true` are enabled — do not use `any` without justification
- `src/components/ui/` is excluded from ESLint (shadcn generated files)

### Error Handling

Always use the centralized systems — do not write `console.error` or silent catches:

```typescript
// Error tracking
import { errorTracker } from "@/lib/security/errorTracking";
errorTracker.trackError({
  message: error.message,
  stack: error.stack,
  severity: "HIGH",
  errorType: "APPLICATION",
  status: "NEW",
});

// Audit logging
import { auditLogger } from "@/lib/audit";
await auditLogger.log({ action: "...", resourceType: "...", severity: "...", details: {} });
```

The `auditLogger` falls back to localStorage if the API is unavailable and retries failed logs automatically.

### API Calls

Wrap all async operations in React Query mutations or queries:

```typescript
const { mutate } = useMutation({
  mutationFn: async (input) => getAICompletion(messages, apiKey),
  onError: (error) => errorTracker.trackError({ message: error.message, ... }),
  onSuccess: (data) => { /* update state */ },
});
```

### Forms

All forms must use React Hook Form + Zod:

```typescript
const schema = z.object({ field: z.string().min(1) });
const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
});
```

---

## Security

### Authentication

- **PIV/CAC card:** Not yet implemented. `authenticateWithPIV()` and `authenticateWithCAC()` return `false` and log a `SECURITY` error. Do not bypass.
- **Password auth:** Via Supabase Auth (`supabase.auth.signUp()` / `supabase.auth.signInWithPassword()`).
- **Session timeout:** 15 minutes (enforced by `AccessControl` singleton).

### Permissions

The `Permission` type in `src/lib/security/accessControl.ts` is the authoritative source. Navigation items in `src/config/navigationItems.ts` must use only permissions defined there. Current permissions:

```
READ_SOLICITATIONS | WRITE_SOLICITATIONS | APPROVE_SOLICITATIONS
READ_PROPOSALS | EVALUATE_PROPOSALS | MANAGE_USERS | VIEW_AUDIT_LOGS | EXPORT_DATA
MANAGE_EVALUATIONS | MANAGE_CONTRACTS | LEGAL_REVIEW | SMALL_BUSINESS_REVIEW | QA_ACCESS
```

### Secrets

- All secrets are in `.env.local` (gitignored). Never hardcode them.
- Startup validation in `src/main.tsx` will throw if required vars are missing (dev only).
- If a secret is accidentally committed, rotate it immediately in the service dashboard.

---

## Domain Concepts

### Acquisition Roles

`CONTRACT_SPECIALIST` | `CONTRACTING_OFFICER` | `PROGRAM_MANAGER` | `LEGAL_REVIEWER` | `SMALL_BUSINESS_SPECIALIST` | `COST_PRICE_ANALYST` | `QUALITY_ASSURANCE`

### Agency Regulations (28 supplements to FAR)

DFARS, GSARS, HHSARS, DEARS, DOSAR, AIDAR, DLAD, NMCARS, AFFARS, EPAAR, FEHBAR, HUDAR, IAAR, JAR, LIFAR, NFS, NRCAR, TAR, VAAR, DTAR, AGAR, CAR, DEAR, DIARS, DOIAR, DOLAR, EDAR

### Solicitation Document Types

`RFI` | `RFP` | `RFQ` | `SOW` | `PWS`

### Response Detail Levels

- `BRIEF` — 3–6 lines
- `STANDARD` — 1-page report
- `COMPREHENSIVE` — Detailed with FAR/agency citations

---

## Application Routes

| Route | Page |
|---|---|
| `/` | Landing page |
| `/dashboard` | User dashboard with metrics |
| `/chat` | AI chat (role + agency selection) |
| `/knowledge-base` | Multi-Domain Knowledge Framework |
| `/proposals` | Proposal management |
| `/profile` | User profile & settings |
| `/signup` | Registration |
| `/reset-password` | Password reset |
| `/acquisition/solicitation-review` | Review RFI/RFP/RFQ documents |
| `/acquisition/market-research` | Market research findings |
| `/acquisition/document-control` | Document version control |
| `/features`, `/pricing`, `/about`, `/contact` | Informational pages |

---

## External Services

| Service | Purpose | Config |
|---|---|---|
| Azure OpenAI (GPT-4o) | LLM responses | `VITE_AZURE_ENDPOINT` + `VITE_AZURE_OPENAI_API_KEY` |
| Pinecone | Vector search (RAG) | `VITE_PINECONE_API_KEY` + `VITE_PINECONE_INDEX_NAME` |
| Supabase | Database + Auth | `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` |

---

## Testing

**Framework:** Vitest + React Testing Library + jsdom

**Run tests:**
```bash
npm test              # single run
npm run test:watch    # watch mode
npm run test:coverage # with coverage
```

**Test locations:**
```
src/lib/security/__tests__/accessControl.test.ts   — Permission matrix unit tests
src/lib/__tests__/audit.test.ts                    — AuditLogger unit tests
src/services/rag/__tests__/vectorStore.test.ts     — RAG graceful degradation tests
src/services/llm/__tests__/masterLLM.test.ts       — MasterLLM response parsing tests
src/services/llm/__tests__/complianceLLM.test.ts   — ComplianceLLM response parsing tests
src/services/reasoning/__tests__/ReasoningEngine.test.ts — Full pipeline integration tests
```

**Conventions:**
- Mock all external services (Azure, Pinecone, Supabase) in unit tests
- Use `vi.stubEnv()` to control `import.meta.env` values in tests
- All mocks go at the top level of the test file (hoisting requirement)

---

## Common Pitfalls

1. **Do not edit `src/integrations/supabase/types.ts`** — it is auto-generated from the database schema.
2. **Do not add custom CSS** in component files; use Tailwind classes exclusively.
3. **Always use `@/` imports** — relative imports across feature boundaries make refactoring fragile.
4. **Wrap AI/async calls in React Query** — avoids inconsistent loading/error states.
5. **Use `errorTracker.trackError()`** — never `console.error`. This is enforced by ESLint.
6. **Use the audit logger** for any user-initiated action — required for compliance traceability.
7. **Access control:** Every new permission must be added to `accessControl.ts` AND assigned to the correct roles before being referenced in `navigationItems.ts`.
8. **PIV/CAC auth stubs return `false`** — do not assume they succeed. Backend WebAuthn integration required before enabling.
9. **Pinecone RAG degrades gracefully** — if `VITE_PINECONE_API_KEY` is not set, `queryVectorStore()` returns `{ matches: [] }` and the reasoning engine continues with LLM-only context.
10. **`src/components/ui/` is excluded from ESLint** — do not put application logic there.
