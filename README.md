# 🔒 QuantumCanary v2 — AI-Powered Cybersecurity Deception Platform

QuantumCanary is a production-ready, full-stack cybersecurity SaaS platform designed to outsmart attackers by deploying intelligent deception layers (honeypots) and canary tokens. The platform features a real-time **Antigravity 3D Threat Mesh Dashboard**, AI-driven threat intelligence analysis, and automated incident reporting.

---

## 📸 Website Mockups

### 1. Enterprise Landing Page
*Premium dark theme with sleek metrics, glassmorphic cards, and high-impact hero positioning.*
![Enterprise Landing Page](public/images/canary_hero.png)

### 2. Antigravity 3D Threat Mesh Dashboard
*Interactive 3D visualization showing live honeypot nodes, floating attackers, and an amber gravity well.*
![3D Threat Mesh Dashboard](public/images/canary_dashboard.png)

### 3. AI-Powered Threat Dossier & Analytics
*Detailed security profiles, radar charts for toolchains, and real-time incident analysis feeds.*
![Threat Dossier & Analytics](public/images/canary_dossier.png)

---

## 🚀 Key Features

*   **🌌 Antigravity 3D Threat Mesh:** Built with Three.js and `@react-three/fiber` to visualize threat topologies. Attackers, honeypots, and assets orbit in a fully interactive, dark-space gravity field.
*   **🤖 AI Threat Intelligence Engine:** Real-time log analyzer, streaming incident report generators, and a floating interactive AI chat assistant powered by OpenAI GPT-4o.
*   **🍯 Smart Deception Layers:** Dynamic deployment of mock SSH, REST API, SMTP, S3, and Database honeypots that mirror production infrastructures.
*   **🎟️ Canary Tokens:** Plant trackable decoys (decoy URLs, DNS names, fake documents) and receive real-time webhooks upon access.
*   **🔐 Next-Generation Auth:** Passwordless OAuth (Google & GitHub) alongside Credentials login with Zod validation, password-strength metrics, email verification, and a 4-step onboarding wizard.
*   **📊 Interactive Analytics:** Rich chart panels powered by Recharts detailing threat vectors, geographical distributions, and attack rates.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) + React 19 |
| **Language** | TypeScript 5.5 |
| **Styling** | Tailwind CSS v3 + CSS Glassmorphism |
| **Database ORM** | Prisma ORM |
| **Authentication** | NextAuth.js v5 (Auth.js) |
| **3D Rendering** | Three.js + React Three Fiber + Drei |
| **State Management**| Zustand v5 (Client State) |
| **Forms & Validation**| React Hook Form + Zod v3 |
| **Animations** | Framer Motion v11 |
| **Charts** | Recharts |

---

## 📂 Architecture & Directory Structure

```text
quantumcanary/
├── prisma/
│   ├── schema.prisma       # Comprehensive database schema (11 Models, 8 Enums)
│   └── seed.ts             # Seed script for users, honeypots, and threats
├── public/
│   └── images/             # Recruiter-facing dashboard & hero mockups
└── src/
    ├── app/                # Next.js App Router root
    │   ├── (auth)/         # Auth routes (Login, Register, Onboarding, Verify)
    │   ├── (dashboard)/    # Monitored pages (Dashboard, Honeypots, Threats, Analytics)
    │   ├── (marketing)/    # Static SEO-optimized pages (Landing, Pricing, About)
    │   ├── api/            # API endpoints (Honeypots, AI, Webhooks, Profile)
    │   ├── layout.tsx      # Root styling & providers wrapper
    │   └── middleware.ts   # Edge route protection & rate limiter
    ├── components/
    │   ├── auth/           # Onboarding, register forms, password strength
    │   ├── dashboard/      # Three.js ThreatMesh components & Live Feed
    │   ├── ui/             # Reusable UI tokens (GlowButton, Gauges, Spinner)
    │   └── marketing/      # Features grid, Hero canvas, Testimonials
    ├── hooks/              # Global stores (Zustand) & useSession hooks
    ├── lib/                # Config libraries (Prisma client, Email, rate-limiter, GPT)
    └── types/              # NextAuth interface extensions
```

---

## 🔧 Getting Started

### 1. Prerequisites
Ensure you have **Node.js v18.17+** and **npm** installed.

### 2. Installation
Clone the repository and install all dependencies:
```bash
git clone https://github.com/your-username/quantumcanary.git
cd quantumcanary
npm install --legacy-peer-deps
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
# NextAuth Config
NEXTAUTH_SECRET="your_nextauth_secret_here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional Keys (Graceful fallbacks are built-in for Demo Mode)
DATABASE_URL="postgresql://user:pass@localhost:5432/quantumcanary"
OPENAI_API_KEY="your_openai_api_key_here"
RESEND_API_KEY="re_your_resend_api_key"
```

### 4. Database Setup & Seeding
If PostgreSQL is running, sync the schema and seed mock data:
```bash
npx prisma db push
npm run db:seed
```

### 5. Running the Application
Start the development server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🛡️ Demo Mode (Offline Safe)
If a database connection is not available, the platform **automatically falls back to Demo Mode**:
*   Registration requests bypass DB writes and register you as a demo user.
*   NextAuth validates credentials locally to allow easy navigation.
*   AI components fall back to technical streaming mock dossiers.
*   *Pre-seeded logins:* Use **`user@quantumcanary.io`** / **`User123!`** to skip onboarding directly into the dashboard.

---

## 🎨 Design Systems & UI Philosophy
*   **Color Palette:** Custom HSL variables representing space (#060918), honey/gold accents (#EFB927), green assets (#1D9E75), and red threats (#E24B4A).
*   **Micro-interactions:** Interactive components use `framer-motion` for transitions, count-up numbers for threat score meters, and custom CSS particles for ambient grids.
*   **Deception Topologies:** All 3D wireframe canvases dynamically size and scale using WebGL, with `Suspense` loaders to optimize first-load performance.
