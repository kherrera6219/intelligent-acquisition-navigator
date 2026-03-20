# ProcurityIQ — Intelligent Acquisition Navigator

> AI-powered federal acquisition workflow management for contracting officers, contract specialists, and program managers.

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6?logo=typescript&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react&logoColor=white)](#)
[![License](https://img.shields.io/badge/license-MIT-blue)](#license)

---

## What is ProcurityIQ?

ProcurityIQ streamlines federal procurement workflows by combining AI-driven guidance, real-time compliance checking, and collaborative document management in a single, modern interface.

### Core Features

| Feature | Description |
|---------|-------------|
| **AI Assistant** | FAR/DFARS compliance guidance, solicitation review, and acquisition strategy — powered by Claude |
| **AI Proposal Writer** | 4-step wizard that drafts Executive Summary, Technical Approach, Management Plan, Past Performance, and Price sections in parallel |
| **Compliance Scanner** | Paste any document; AI identifies FAR/DFARS citations, flags issues, and assigns risk levels |
| **Opportunity Discovery** | SAM.gov Opportunities API search with keyword, NAICS, set-aside, and type filters |
| **Solicitation Review** | Full lifecycle: DRAFT → IN_REVIEW → APPROVED → PUBLISHED with Supabase persistence |
| **Document Control** | Upload, version, and retrieve procurement documents via Supabase Storage |
| **Live Analytics** | Acquisition volume, cycle time, and contract-type charts driven by real database queries |
| **In-App Notifications** | Bell icon with real-time alerts for deadlines, status changes, and AI completions |
| **Market Research** | Vendor performance tracking with CAGE codes, UEIs, NAICS codes, and past performance summaries |

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18.3 + TypeScript 5.5 |
| Build | Vite 5.4 (SWC transpiler) |
| Styling | Tailwind CSS 3.4 + shadcn/ui (Radix UI primitives) |
| State / Data | TanStack Query v5 |
| Backend | Supabase (PostgreSQL + Auth + Storage + Realtime) |
| AI / LLM | Anthropic Claude (`claude-opus-4-6`) via `@anthropic-ai/sdk` |
| Vector DB | Pinecone — optional; powers knowledge-base RAG |
| Routing | React Router v6 |
| Forms | react-hook-form + Zod |
| Charts | Recharts |
| Icons | lucide-react |

---

## Quick Start

### Prerequisites

- Node.js ≥ 18
- An [Anthropic API key](https://console.anthropic.com/) — required for AI features

### 1 — Clone & install

```bash
git clone https://github.com/kherrera6219/intelligent-acquisition-navigator.git
cd intelligent-acquisition-navigator
npm install
```

### 2 — Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and set at minimum:

```env
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

See [`.env.example`](.env.example) for the complete variable list.

### 3 — Start the dev server

```bash
npm run dev
# → http://localhost:8080
```

### 4 — (Optional) Enable live SAM.gov opportunities

```env
VITE_SAM_GOV_API_KEY=<free-key-from-sam.gov>
```

Without a key the Opportunities page displays 5 realistic demo records.

---

## Available Scripts

```bash
npm run dev          # Dev server with HMR on port 8080
npm run build        # Production build → dist/
npm run build:dev    # Dev-mode production build
npm run lint         # ESLint (zero errors required)
npm run preview      # Preview production build locally
```

---

## Project Structure

```
src/
├── App.tsx                         # Root — routing + providers
├── main.tsx                        # ReactDOM entry point
│
├── components/
│   ├── ui/                         # shadcn/ui primitives + custom universals
│   ├── auth/                       # Login, signup, password-reset forms
│   ├── chat/                       # Chat UI (messages, input, toolbar, file upload)
│   ├── knowledge/                  # Knowledge-base components
│   ├── layout/                     # MainLayout, PageHeader, DashboardCard
│   └── notifications/              # NotificationCenter bell + panel
│
├── config/
│   └── navigationItems.ts          # Centralised nav items + permission gates
│
├── hooks/
│   ├── useAzureAI.ts               # TanStack useMutation wrapper for Claude calls
│   ├── useProposals.ts             # Proposals CRUD (Supabase + mock fallback)
│   ├── useSolicitations.ts         # Solicitations CRUD
│   ├── useDocuments.ts             # Document upload / download / signed URLs
│   └── useNotifications.ts         # In-app notification store (localStorage)
│
├── integrations/supabase/          # Supabase client + auto-generated DB types
│
├── lib/
│   ├── audit.ts                    # Audit logging (Supabase → localStorage fallback)
│   ├── error/ErrorBoundary.tsx     # React error boundary
│   └── security/
│       ├── accessControl.ts        # RBAC — 6 roles, 9 permissions, 15-min timeout
│       └── errorTracking.ts        # Security incident detection
│
├── pages/
│   ├── Dashboard.tsx               # Live KPI dashboard (Supabase counts)
│   ├── Analytics.tsx               # Live acquisition charts
│   ├── Chat.tsx                    # AI Assistant (20-message context window)
│   ├── Compliance.tsx              # Compliance checklist + AI scanner
│   ├── Opportunities.tsx           # SAM.gov opportunity discovery
│   ├── Proposals.tsx               # Proposal list + workflow management
│   ├── proposals/NewProposal.tsx   # AI proposal drafting wizard
│   └── acquisition/
│       ├── SolicitationReview.tsx  # Solicitation lifecycle management
│       ├── MarketResearch.tsx      # Vendor research + detail sheet
│       └── DocumentControl.tsx     # Document upload / view / download
│
├── providers/
│   └── QueryProvider.tsx           # TanStack Query v5 + global error handling
│
├── services/
│   ├── azure/aiService.ts          # Claude SDK wrapper with context management
│   ├── llm/                        # masterLLM + complianceLLM (Zod-validated)
│   ├── rag/vectorStore.ts          # Pinecone vector operations
│   └── reasoning/                  # Multi-step compliance reasoning engine
│
└── types/                          # Domain type definitions (acquisition, chat, etc.)
```

---

## Architecture

### AI Call Pipeline

```
Component calls getAICompletion(messages)
        │
        ▼
aiService.ts
  • Separates system messages from conversation
  • Applies sliding window: last 20 conversation messages
  • Truncates any single message > 8,000 chars
  • Initialises Anthropic SDK with VITE_ANTHROPIC_API_KEY
        │
        ▼
Anthropic claude-opus-4-6 (direct browser SDK call)
        │
        ▼
Response text → returned to caller
  Compliance / master LLM: Zod schema validation before use
```

### Data Flow

```
React component (useQuery / useMutation)
        │
        ▼
TanStack Query v5 (QueryCache + MutationCache error handling)
        │
        ▼
Supabase JS client
        │
        ▼
Supabase PostgreSQL + Row Level Security
```

### Security Model

- **RBAC**: 6 roles with distinct permission sets; enforced at component level
- **Session**: 15-minute idle timeout via Supabase auth; `auth:session-expired` event dispatched on expiry
- **File uploads**: MIME-type whitelist (PDF, Word, Excel, PPT, text, CSV) + 50 MB cap enforced client-side before upload
- **AI inputs**: Per-message character cap + context window limit to prevent token overflow
- **Compliance decisions**: Zod-validated structured output; unstructured responses are flagged `requiresHumanReview: true`
- **Audit logging**: All auth events and mutations logged to Supabase; falls back to encrypted localStorage when offline

---

## Database Schema

| Table | Key Columns |
|-------|------------|
| `solicitations` | `id`, `title`, `type` (RFI/RFP/RFQ/SOW/PWS), `status` (DRAFT→PUBLISHED), `estimated_value`, `assigned_to`, `due_date` |
| `proposals` | `id`, `title`, `vendor`, `amount`, `contract_type`, `status`, `assigned_to`, `due_date` |
| `user_documents` | `id`, `file_name`, `file_path`, `file_type`, `file_size`, `user_id`, `uploaded_at` |
| `conversations` | `id`, `title`, `user_id`, `created_at` |
| `chat_messages` | `id`, `conversation_id`, `role`, `content`, `user_id`, `metadata` |
| `audit_logs` | `id`, `action`, `resource_type`, `resource_id`, `severity`, `details`, `user_id` |
| `reasoning_results` | Multi-step compliance reasoning output |
| `ai_analysis_records` | AI confidence scores and analysis metadata |

---

## Environment Variables

| Variable | Required | Description |
|----------|:--------:|-------------|
| `VITE_ANTHROPIC_API_KEY` | ✅ | Anthropic Claude API key |
| `VITE_SAM_GOV_API_KEY` | ☐ | SAM.gov Opportunities API key (demo mode without it) |
| `VITE_SUPABASE_URL` | Pre-filled | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Pre-filled | Supabase public anon key |
| `VITE_PINECONE_API_KEY` | ☐ | Pinecone key for RAG knowledge base |
| `VITE_PINECONE_ENVIRONMENT` | ☐ | Pinecone environment region |
| `VITE_PINECONE_INDEX` | ☐ | Pinecone index name |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for branching strategy, coding conventions, and the PR workflow.

---

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for Netlify, Vercel, and self-hosted instructions.

---

## Architecture Deep-Dive

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for a full description of the system design, service boundaries, and extension points.

---

## License

MIT © 2026 ProcurityIQ Contributors
