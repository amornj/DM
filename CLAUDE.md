# DM — AACE 2026 T2D Clinical Guide

## Project Overview

Clinical decision support web application for Type 2 Diabetes management based on the 2026 AACE Algorithm. Built for licensed healthcare professionals as a point-of-care reference tool with interactive calculators, evidence-based drug recommendations, and AI-powered Q&A via NotebookLM.

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with `@theme` inline in `globals.css`
- **State**: Zustand (ephemeral chat + persisted assessment)
- **Icons**: Lucide React
- **Markdown**: react-markdown (for NotebookLM responses)
- **Deployment**: Vercel

## Architecture

```
Browser → Next.js App Router (Vercel)
                ↓
     /api/notebooklm (Next.js route)
                ↓
     Tailscale Funnel (NLM_PROXY_URL)
                ↓
     Mac localhost:3847 (nlm-proxy CLI)
                ↓
     NotebookLM API (notebook c747d664-...)
```

All pages are `'use client'` components using local React state for calculators. The app uses a right-slide drawer sidebar (`Sidebar.tsx`) and sticky header via `Layout.tsx`. The floating hamburger button is in the bottom-right corner.

## Color Scheme

- Primary: `#0d6e6e` (deep teal)
- Primary dark: `#0a5555`
- Primary light: `#e6f4f4`
- Body background: `#f8fafb`
- Text: `#1a2e2e`

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home dashboard — navigation cards, hero, medical disclaimer |
| `/prediabetes` | IFG/IGT criteria, A1C + BMI calculator, lifestyle and pharmacotherapy |
| `/classification` | 5-step diabetes classification wizard (T1D vs T2D, MODY, secondary) |
| `/dyslipidemia` | ASCVD risk tiers, LDL-C targets, statin ladder, SAMS, TG calculator |
| `/hypertension` | BP targets, stepwise treatment algorithm, comorbidity-specific guidance |
| `/comorbidities` | KEY ALGORITHM — comorbidity-driven drug selection engine (HF, CKD, ASCVD, MASLD) |
| `/glucose-centric` | A1C-tiered therapy: mono/dual/triple/insulin, weight effect, hypo risk |
| `/insulin` | Basal dosing calculator, titration guide, BeAM calculator |
| `/medications` | Searchable/filterable T2D drug database (29 medications) |
| `/obesity` | Weight-loss medications, dosing, bariatric surgery criteria |
| `/vaccines` | Recommended immunizations for adults with T2D |
| `/cgm` | CGM targets (TIR/TBR/TAR/CV), AGP checker, GMI vs A1C |
| `/ask` | NotebookLM chat — Brief/Explanatory modes, read aloud, persisted history |

## Key Files

```
src/
├── app/
│   ├── api/notebooklm/route.ts   # NotebookLM proxy API route
│   ├── ask/page.tsx              # Chat UI for NotebookLM Q&A
│   ├── cgm/page.tsx              # CGM guide with AGP target checker
│   ├── globals.css               # Tailwind v4 @theme config
│   └── layout.tsx                # Root layout with Geist fonts
├── components/
│   ├── Layout.tsx                # Sticky header, floating hamburger, footer
│   └── Sidebar.tsx               # Right-slide drawer navigation (13 items)
├── store/
│   ├── chatStore.ts              # Zustand: ephemeral chat messages + conversationId
│   └── assessmentStore.ts        # Zustand + localStorage: patient assessment state
├── types/index.ts                # Drug, ChatMessage, AssessmentState interfaces
├── lib/utils.ts                  # cn() utility (clsx + tailwind-merge)
└── data/medications.ts           # 29 T2D drug profiles
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NLM_PROXY_URL` | `http://localhost:3847` | URL of the nlm-proxy server |
| `NLM_PROXY_KEY` | `cto-coach-2026` | API key for nlm-proxy authentication |

Set in `.env.local` for development or in Vercel project settings for production.

## NotebookLM Proxy Infrastructure

The `/ask` page queries the AACE 2026 source material via a chain:

1. **Browser** → POST `/api/notebooklm` (Vercel serverless function)
2. **Vercel** → POST `${NLM_PROXY_URL}/query` with `x-api-key` header
3. **Tailscale Funnel** → routes to Mac running nlm-proxy on port 3847
4. **nlm-proxy** → queries NotebookLM notebook `c747d664-65bb-4797-a462-ed36727bc1ce`
5. **NotebookLM** → returns AI-synthesized answer from uploaded clinical sources

The notebook ID is hardcoded in `src/app/api/notebooklm/route.ts`.

### Mode Prefixes

- **Brief**: numbered list, bold key phrases, max 4-5 items
- **Explanatory**: numbered list, each item with bold key phrase + explanation

## ChatStore

`src/store/chatStore.ts` — Zustand store (ephemeral, no persistence):
- `messages: ChatMessage[]` — conversation history
- `conversationId: string | null` — for multi-turn context
- `addMessage()`, `clearMessages()`, `setConversationId()`

## Commands

```bash
npm run dev       # Start development server (localhost:3000)
npm run build     # Production build (must pass before deploy)
npm run lint      # ESLint check
vercel --prod     # Deploy to production
```

## Patterns

- All pages: `'use client'` + local `useState` for interactivity
- Card sections: white bg, `rounded-xl`, `shadow-sm`, `border border-gray-100`
- Section headers: `#e6f4f4` background, `#0d6e6e` text, `font-semibold text-sm`
- Color-coded feedback: green = at-target, amber = warning, red = urgent
- Responsive: `grid-cols-2 sm:grid-cols-3` for card grids
