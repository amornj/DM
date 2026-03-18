# DM — AACE 2026 T2D Clinical Guide

Clinical decision support web app for Type 2 Diabetes management, based on the 2026 AACE Algorithm. Built for licensed healthcare professionals as a point-of-care reference.

## Features

- **13 Clinical Modules**: Prediabetes, Classification, Dyslipidemia, Hypertension, Comorbidities, Glucose-Centric, Insulin, Medications, Obesity, Vaccines, CGM Guide
- **Interactive Calculators**: A1C/BMI, LDL-C targets, BP assessment, basal insulin dosing, AGP target checker
- **Drug Decision Engine**: Comorbidity-driven recommendations (HF, CKD, ASCVD, MASLD) with trial evidence
- **AI Q&A**: Chat interface querying AACE 2026 guidelines via NotebookLM
- **CGM Metrics**: TIR/TAR/TBR targets, GMI vs A1C, variability guidance

## Tech Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Zustand · Lucide React · Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

```env
NLM_PROXY_URL=https://your-tailscale-funnel-url
NLM_PROXY_KEY=your-api-key
```

See `CLAUDE.md` for full architecture and development documentation.

## Disclaimer

For licensed healthcare professionals only. Not a substitute for clinical judgment. Based on the AACE 2026 Algorithm for Management of Adults with Type 2 Diabetes.
