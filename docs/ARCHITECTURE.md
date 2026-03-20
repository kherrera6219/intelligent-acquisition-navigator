# Architecture — ProcurityIQ

This document describes the system design, service boundaries, data flows, and key architectural decisions.

---

## Overview

ProcurityIQ is a **client-side Single-Page Application (SPA)** built with React and Vite. There is no dedicated application server — all backend services are provided by:

- **Supabase** — PostgreSQL database, authentication, file storage, and Realtime subscriptions
- **Anthropic API** — Claude LLM accessed directly from the browser via the official SDK

```
Browser (SPA)
├── React Router v6        — client-side routing
├── TanStack Query v5      — server state, caching, mutations
├── Supabase JS client     — database, auth, storage
└── Anthropic SDK          — AI completions (dangerouslyAllowBrowser)
```

---

## Directory Responsibilities

### `src/services/`

Pure service modules — no React hooks, no UI side-effects.

| File | Responsibility |
|------|---------------|
| `azure/aiService.ts` | All Claude API calls; context-window management; FAR citation extraction |
| `llm/masterLLM.ts` | Orchestration LLM — returns `{ suggestion, confidence, reasoning }` |
| `llm/complianceLLM.ts` | Compliance evaluation — returns `{ approved, reason, riskLevel, suggestions }` |
| `rag/vectorStore.ts` | Pinecone vector upsert / query for knowledge-base RAG |
| `reasoning/ReasoningEngine.ts` | Multi-step compliance reasoning (QUERY_PARSING → REASONING → COMPLIANCE_CHECK → CONCLUSION) |
| `reasoning/reasoningDb.ts` | Persists reasoning steps and results to Supabase |
| `samgov/opportunitiesService.ts` | SAM.gov Opportunities API v2 client; mock fallback when key is absent |

### `src/hooks/`

TanStack Query hooks — the only layer allowed to call Supabase or service functions.

| Hook | Description |
|------|-------------|
| `useAzureAI` | `useMutation` wrapper around `getAICompletion`; AbortController for cancellation |
| `useProposals` | Proposals CRUD; mock fallback while `proposals` table is being provisioned |
| `useSolicitations` | Solicitations CRUD against the live `solicitations` Supabase table |
| `useDocuments` | Document upload/download via `user_documents` table + Supabase Storage |
| `useNotifications` | In-memory + localStorage notification store with subscribe/unsubscribe pattern |

### `src/lib/`

Application infrastructure.

| Module | Description |
|--------|-------------|
| `audit.ts` | Structured audit logging; writes to Supabase `audit_logs`, falls back to localStorage |
| `error/ErrorBoundary.tsx` | Catches unhandled render errors; tracks via `errorTracker` |
| `security/accessControl.ts` | Singleton RBAC class; 6 roles, 9 permissions, 30s session-expiry check |
| `security/errorTracking.ts` | Security incident detection via keyword matching on error messages |

---

## AI Pipeline

### Direct Browser SDK Pattern

The app calls the Anthropic API directly from the browser using the official SDK's `dangerouslyAllowBrowser: true` flag. The API key is supplied via `VITE_ANTHROPIC_API_KEY`.

**Why this approach?**

- No backend server to provision or maintain
- Suitable for internal government tools where the key is managed by the agency
- For production deployments requiring key isolation, replace `getAICompletion()` with a call to a Supabase Edge Function (see [DEPLOYMENT.md](DEPLOYMENT.md))

### Context Window Management

`aiService.ts` enforces two limits before every API call:

1. **Sliding window** — keeps only the last 20 non-system messages from the conversation history
2. **Per-message truncation** — clips any individual message exceeding 8,000 characters

This prevents token-overflow errors on long conversations without requiring the caller to manage context.

### Structured Output Validation

`masterLLM` and `complianceLLM` require structured JSON from Claude. Both use Zod schemas to validate the parsed output:

- **On success**: returns the validated object
- **On failure**: `masterLLM` returns a low-confidence (`0.4`) fallback; `complianceLLM` sets `requiresHumanReview: true` and `riskLevel: 'high'` — never guesses compliance status

---

## Data Flow

### Read (Query)

```
Component renders → useQuery fires → TanStack Query checks cache
    │ (stale or first load)
    ▼
Supabase .from("table").select("*")
    ▼
PostgreSQL (with RLS policies applied)
    ▼
Data returned → TanStack Query caches for 5 min (staleTime) / 30 min (gcTime)
    ▼
Component re-renders with data
```

### Write (Mutation)

```
User action → useMutation.mutate(payload)
    ▼
Supabase .from("table").insert/update/delete
    ▼
On success: queryClient.invalidateQueries(["affected-key"])
    ▼
Affected useQuery hooks refetch → UI updates
    ▼
pushNotification() → bell icon increments
auditLogger.log() → audit_logs table
```

### Error Handling

Errors propagate up through three layers:

1. **Supabase/SDK error** → caught in hook's `onError` or service function's `catch`
2. **TanStack Query MutationCache/QueryCache** → global toast + audit log via `QueryProvider.tsx`
3. **Unhandled render error** → `ErrorBoundary.tsx` catches, renders fallback UI

---

## Security Architecture

### RBAC

`accessControl` is a singleton instantiated once at module load. Components call `accessControl.hasPermission("WRITE_SOLICITATIONS")` to gate UI elements.

Permission matrix:

| Permission | CO | CS | PM | LR | SBS | SA |
|------------|:--:|:--:|:--:|:--:|:---:|:--:|
| READ_SOLICITATIONS | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| WRITE_SOLICITATIONS | ✓ | ✓ | | | | ✓ |
| APPROVE_SOLICITATIONS | ✓ | | | | | ✓ |
| READ_PROPOSALS | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| EVALUATE_PROPOSALS | ✓ | ✓ | ✓ | | | ✓ |
| MANAGE_USERS | | | | | | ✓ |
| VIEW_AUDIT_LOGS | ✓ | | | ✓ | | ✓ |
| EXPORT_DATA | | | | | | ✓ |
| MANAGE_CONTRACTS | | | | | | ✓ |

*CO = Contracting Officer, CS = Contract Specialist, PM = Program Manager, LR = Legal Reviewer, SBS = Small Business Specialist, SA = System Admin*

### File Upload Security

`DocumentControl.tsx` enforces before any upload:
1. MIME type must be in the whitelist (PDF, Word, Excel, PPT, text, CSV)
2. File size must be ≤ 50 MB
3. The `accept` attribute on the `<input>` restricts the OS file picker

### Session Timeout

`AccessControl.startSessionMonitor()` runs a `setInterval` every 30 seconds. On expiry it dispatches `auth:session-expired` so the React app can handle the redirect via React Router without a hard page reload.

---

## State Management

| State type | Solution |
|------------|----------|
| Server state (DB data) | TanStack Query |
| Form state | react-hook-form + Zod |
| UI / local state | React `useState` / `useReducer` |
| Cross-component notifications | In-memory `_notifications` array + localStorage in `useNotifications.ts` |
| User settings | localStorage via `procurityiq:settings` key |
| Compliance items | localStorage via `procurityiq:compliance-items` key |

---

## Extension Points

### Adding a new page

1. Create `src/pages/MyPage.tsx`
2. Add a `<Route path="/my-page" element={<MyPage />} />` in `src/App.tsx`
3. Add a nav item in `src/config/navigationItems.ts`

### Adding a new Supabase table

1. Create the migration in the Supabase dashboard
2. Regenerate types: `supabase gen types typescript --project-id bosxxgbinzcjgwjaotyb > src/integrations/supabase/types.ts`
3. Create a hook in `src/hooks/use<TableName>.ts` following the `useSolicitations.ts` pattern

### Replacing the AI provider

All AI calls go through `src/services/azure/aiService.ts`. To switch providers:
1. Replace the Anthropic SDK instantiation with the new SDK
2. Adapt `getAICompletion()` to return the same `AzureAIResponse` shape
3. No other files need to change

### Moving AI to a backend (Supabase Edge Function)

1. Create a Supabase Edge Function that mirrors the current `src/pages/api/azure-ai.ts` handler
2. Update `getAICompletion()` to `fetch("https://<project>.functions.supabase.co/azure-ai", ...)`  instead of calling the SDK directly
3. Store `ANTHROPIC_API_KEY` as a Supabase secret (never in `VITE_*`)
