# CLAUDE.md — Intelligent Acquisition Navigator

Guidance for AI assistants working in this codebase.

## Project Overview

**Intelligent Acquisition Navigator** is a federal acquisition workflow management system with AI/LLM capabilities. It helps contracting professionals (Contract Specialists, Contracting Officers, Program Managers, etc.) navigate FAR/DFARS compliance, review solicitation documents, conduct market research, and get AI-powered acquisition guidance.

**Stack:** React 18 + TypeScript + Vite | Tailwind CSS + shadcn/ui | Azure OpenAI (GPT-4o) + Pinecone RAG | Supabase (PostgreSQL + Auth)

---

## Development Commands

```bash
npm run dev        # Start dev server on http://localhost:8080
npm run build      # Production build → dist/
npm run build:dev  # Development build
npm run lint       # ESLint validation
npm run preview    # Preview production build locally
```

> The dev server binds to `::` (all interfaces) on port **8080**.

### Package Manager

Both `bun.lockb` and `package-lock.json` are present. Use **npm** for consistency unless Bun is explicitly required.

---

## Directory Structure

```
src/
├── components/          # React components (~98 total)
│   ├── auth/            # Login, signup, password reset UI
│   ├── chat/            # Chat interface components
│   ├── knowledge/       # Knowledge base components
│   ├── landing/         # Landing page sections (Hero, Features, etc.)
│   ├── layout/          # AppLayout, Sidebar, Header
│   ├── navigation/      # Navigation menus, breadcrumbs
│   ├── sections/        # Page section components
│   └── ui/              # shadcn/ui + custom universal components
│       └── universal/   # Custom wrappers: Card, Grid, Container, GradientButton, etc.
├── pages/               # Route-level page components
│   ├── acquisition/     # SolicitationReview, MarketResearch, DocumentControl
│   ├── api/             # Client-side API route handlers
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
│   ├── useAzureAI.ts    # Mutation hook for Azure AI calls
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
│   ├── audit.ts         # auditLogger singleton
│   ├── utils.ts         # General helpers (cn(), etc.)
│   ├── error/           # ErrorBoundary component
│   ├── security/        # accessControl.ts, errorTracking.ts
│   └── validation/      # forms.ts — Zod validation schemas
├── integrations/
│   └── supabase/
│       ├── client.ts    # Supabase client instance
│       └── types.ts     # Auto-generated DB types — DO NOT EDIT MANUALLY
├── providers/
│   └── QueryProvider.tsx  # React Query + global error handling
├── config/
│   └── navigationItems.ts # Role-gated nav menu definitions
├── constants/
│   └── chatOptions.ts   # Acquisition roles and agency regulation enums
├── data/                # Static data (charts, section content)
├── styles/              # Global CSS (global.css, application.css, index.css)
├── App.tsx              # Root component with routes
└── main.tsx             # Entry point
```

---

## Architecture

### Component Hierarchy

```
App.tsx
└── AppLayout (layout/AppLayout.tsx)
    ├── Sidebar / Navigation
    └── Page Components (pages/)
        └── Feature Components (components/)
            └── UI Primitives (components/ui/)
```

### State Management

| Concern | Tool |
|---|---|
| Server/async state | TanStack React Query (5-min stale, 30-min cache) |
| Form state | React Hook Form + Zod |
| Local UI state | `useState` / `useReducer` |
| Global context | Context providers (QueryProvider, TooltipProvider) |

### AI / LLM Pipeline

```
User Query
  → masterLLM.ts (orchestrator)
  → Query Parsing
  → ReasoningEngine.ts (multi-step reasoning)
  → complianceLLM.ts (FAR/agency compliance check)
  → RAG lookup via vectorStore.ts (Pinecone)
  → Azure GPT-4o (gpt-4o deployment)
  → Conclusion with citations
```

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

### Styling

- **Tailwind utility classes only** — no custom CSS in component files
- Dark mode via `dark:` variants (class-based, `darkMode: ["class"]`)
- Custom design tokens defined in `tailwind.config.ts`:
  - Primary: `#0066CC` (Deep Blue)
  - Secondary: `#00A86B` (Emerald Green)
  - Accent: `#FFA500` (Orange)
- Animations: Framer Motion for page transitions; Tailwind keyframes (`fade-up`, `fade-in`, `scale-in`) for UI

### TypeScript

- All shared interfaces live in `src/types/` and are named exports
- `src/integrations/supabase/types.ts` is **auto-generated** — do not edit manually; regenerate via Supabase CLI
- Path aliases: `@/*` → `./src/*`
- Unused variables/params are permitted by ESLint config (rule is `off`)

### Error Handling

Always use the centralized systems — do not write ad-hoc `console.error` or silent catches:

```typescript
// Error tracking
import { errorTracker } from "@/lib/security/errorTracking";
errorTracker.track(error, { severity: "HIGH", type: "APPLICATION" });

// Audit logging
import { auditLogger } from "@/lib/audit";
await auditLogger.log({ action: "...", resourceType: "...", severity: "...", details: {} });
```

The `auditLogger` falls back to localStorage if the API is unavailable and retries failed logs automatically.

### API Calls

Wrap all async operations in React Query mutations or queries:

```typescript
const { mutate } = useMutation({
  mutationFn: async (input) => azureAIService.query(input),
  onError: (error) => errorTracker.track(error),
  onSuccess: (data) => { /* update state */ },
});
```

### Forms

All forms must use React Hook Form + Zod:

```typescript
const schema = z.object({ field: z.string().min(1) });
const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
```

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

| Service | Purpose | Config Location |
|---|---|---|
| Azure OpenAI (GPT-4o) | LLM responses | `src/services/azure/aiService.ts` |
| Pinecone | Vector search (RAG) | `src/services/rag/vectorStore.ts` |
| Supabase | Database + Auth | `src/integrations/supabase/client.ts` |

> **Note:** Azure endpoint and Supabase project URL/anon key are currently hardcoded in their respective client files. When adding new environment-specific config, use `import.meta.env.VITE_*` variables and document them here.

---

## Testing

No test framework is currently configured. When adding tests, prefer **Vitest** (already compatible with the Vite setup) with **React Testing Library** for component tests.

---

## Common Pitfalls

1. **Do not edit `src/integrations/supabase/types.ts`** — it is auto-generated from the database schema.
2. **Do not add custom CSS** in component files; use Tailwind classes exclusively.
3. **Always use `@/` imports** — relative imports across feature boundaries make refactoring fragile.
4. **Wrap AI/async calls in React Query** — avoids inconsistent loading/error states.
5. **Use the audit logger** for any user-initiated action — required for compliance traceability.
6. **Access control**: Check `src/config/navigationItems.ts` when adding new routes — some require specific role permissions.
