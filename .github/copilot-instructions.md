# Project Instructions for Claude

## Overview

This is a **Next.js 16** template project with a **clean architecture** pattern, **Zustand** state management, and **Tailwind CSS v4**. It uses the **App Router** exclusively (no Pages Router).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/postcss`
- **State Management:** Zustand
- **Font:** Geist Sans + Geist Mono (via `next/font/google`)
- **Linting:** ESLint 9 (flat config) + Prettier
- **Testing:** Vitest + React Testing Library
- **Git Hooks:** Husky + lint-staged

## Architecture — Layered Folder Structure

```
src/
├── app/          → PRESENTATION LAYER (Routes)
│                   Next.js App Router — pages, layouts, loading, error states.
│                   Route groups use (parentheses) syntax: (auth), (dashboard).
│                   API routes live under app/api/.
│
├── components/   → PRESENTATION LAYER (UI)
│   ├── ui/       → Generic reusable components (Button, Input, Card).
│   ├── layout/   → Structural components (Header, Footer, Sidebar).
│   └── features/ → Feature-specific components, grouped by domain.
│
├── hooks/        → PRESENTATION LAYER (Logic)
│                   Custom React hooks. Client-side only ("use client").
│
├── stores/       → PRESENTATION LAYER (State)
│                   Zustand stores. Each store is a single file.
│                   Export via barrel file (index.ts).
│
├── services/     → SERVICE LAYER
│   ├── api/      → API client (fetch wrapper), endpoint constants.
│   │               client.ts has centralized error handling, timeout, JSON parsing.
│   └── actions/  → Server Actions ("use server") for data mutations.
│                   Each action is a separate file: *.action.ts
│
├── models/       → DOMAIN LAYER
│                   TypeScript interfaces for domain entities (User, Product, etc.).
│                   File naming: *.model.ts
│
├── types/        → DOMAIN LAYER
│                   Shared TypeScript utility types (Nullable, Optional, Dictionary).
│                   Barrel export via index.ts.
│
├── lib/          → INFRASTRUCTURE LAYER
│                   Pure utility functions: cn() for className merging,
│                   formatDate(), constants (APP_NAME, ROUTES, API_BASE_URL).
│
├── config/       → INFRASTRUCTURE LAYER
│                   App configuration: site.ts has metadata, navigation config.
│
└── __tests__/    → Test files. Vitest + React Testing Library.
```

## Key Rules

### Server vs Client Components
- Components in `app/` are **Server Components by default**.
- Only add `"use client"` when the component needs interactivity, state, or browser APIs.
- Keep client components small — push them to the leaves of the component tree.

### Data Flow
- **Read data:** Fetch directly in Server Components using `async/await` or use `services/api/client.ts`.
- **Mutate data:** Use Server Actions (`services/actions/`) invoked via `<form action={…}>` or programmatically.
- **Client state:** Use Zustand stores (`stores/`). Never use Zustand for server-fetched data.

### File Naming Conventions
| Type | Pattern | Example |
|------|---------|---------|
| Model | `*.model.ts` | `user.model.ts` |
| Server Action | `*.action.ts` | `login.action.ts` |
| Hook | `use-*.ts` | `use-media-query.ts` |
| Store | `use-*-store.ts` | `use-app-store.ts` |
| Component | kebab-case `.tsx` | `button.tsx`, `header.tsx` |
| Page | `page.tsx` | `app/dashboard/page.tsx` |

### Styling
- Use **Tailwind CSS utility classes** exclusively.
- For conditional classes, use the `cn()` helper from `@/lib/utils` (wraps clsx + tailwind-merge).
- CSS variables are defined in `globals.css`: `--background`, `--foreground`, `--font-sans`, `--font-mono`.
- Dark mode is handled via `prefers-color-scheme` media query in CSS.

### Path Aliases
- `@/*` maps to `./src/*` (configured in tsconfig.json).
- Always use `@/` imports. Never use relative imports like `../../`.

### API Client
- `services/api/client.ts` exports `apiClient` with methods: `get`, `post`, `put`, `patch`, `delete`.
- All methods auto-parse JSON, handle errors with `ApiError` class, and support timeout.
- Endpoint strings are centralized in `services/api/endpoints.ts`.

### State Management (Zustand)
- Each domain gets its own store file in `stores/`.
- Stores are SSR-safe — they initialize on the client only.
- Use selectors: `const theme = useAppStore((s) => s.theme)` — never destructure the whole store.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check (tsc --noEmit)
npm run format       # Format all files with Prettier
npm run format:check # Check formatting without writing
npm run test         # Run tests in watch mode (Vitest)
npm run test:run     # Run tests once
```

## Creating New Features

When creating a new feature (e.g., "products"):

1. **Model:** `src/models/product.model.ts` — define the Product interface
2. **API endpoints:** Add to `src/services/api/endpoints.ts`
3. **Server Actions** (if mutations needed): `src/services/actions/product.action.ts`
4. **Store** (if client state needed): `src/stores/use-product-store.ts`
5. **Components:** `src/components/features/products/` — feature-specific components
6. **Page:** `src/app/products/page.tsx` — the route
7. **Tests:** `src/__tests__/product.test.tsx`

## Important Notes

- Do NOT use `pages/` directory — this project uses App Router (`app/`) only.
- Do NOT install axios — use the built-in `apiClient` from `services/api/client.ts`.
- Do NOT use React Context for global state — use Zustand stores.
- Do NOT use inline styles — use Tailwind CSS classes with `cn()`.
- All environment variables must be listed in `.env.example`.
- `NEXT_PUBLIC_` prefix is required for client-accessible env vars.
