# Next.js Template

A modern Next.js 16 template with **clean architecture**, **Zustand** state management, and production-ready tooling.

## Tech Stack

- **Next.js 16** — App Router, Server Components, Server Actions
- **React 19** — Latest React with concurrent features
- **TypeScript 5** — Strict mode enabled
- **Tailwind CSS v4** — Utility-first CSS via PostCSS
- **Zustand** — Lightweight state management (~1KB)
- **ESLint 9** — Flat config with Next.js rules
- **Prettier** — Code formatting with Tailwind plugin
- **Vitest** — Fast unit testing with React Testing Library
- **Husky** — Pre-commit hooks with lint-staged

## Getting Started

```bash
# Clone the template
git clone <repo-url> my-project
cd my-project

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure

```
src/
├── app/                # Routes, pages, layouts, API routes
│   ├── layout.tsx      # Root layout (Geist font, metadata)
│   ├── page.tsx        # Home page
│   ├── not-found.tsx   # 404 page
│   ├── error.tsx       # Error boundary
│   ├── loading.tsx     # Loading state
│   ├── (auth)/         # Route group example
│   └── api/health/     # Health check endpoint
│
├── components/         # UI components
│   ├── ui/             # Generic: Button, Input, Card
│   ├── layout/         # Header, Footer, Sidebar
│   └── features/       # Feature-specific components
│
├── hooks/              # Custom React hooks
├── stores/             # Zustand state stores
├── services/           # API client + Server Actions
│   ├── api/            # Fetch wrapper + endpoint constants
│   └── actions/        # Server Actions (data mutations)
│
├── models/             # Domain entity interfaces (*.model.ts)
├── types/              # Shared TypeScript types
├── lib/                # Utilities (cn(), constants)
├── config/             # App configuration (site metadata)
└── __tests__/          # Test files
```

## Architecture

```
┌───────────────────────────────────────────┐
│           PRESENTATION LAYER              │
│  app/ → components/ → hooks/ → stores/    │
├───────────────────────────────────────────┤
│           SERVICE LAYER                   │
│  services/api/ → services/actions/        │
├───────────────────────────────────────────┤
│           DOMAIN LAYER                    │
│  models/ → types/                         │
├───────────────────────────────────────────┤
│           INFRASTRUCTURE LAYER            │
│  lib/ → config/ → app/api/                │
└───────────────────────────────────────────┘
```

- **Presentation** — UI rendering, user interaction, client state
- **Service** — Data fetching, API communication, server-side mutations
- **Domain** — Entity definitions, shared type contracts
- **Infrastructure** — Utilities, constants, configuration, API endpoints

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript compiler check |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting |
| `npm run test` | Run tests (watch mode) |
| `npm run test:run` | Run tests once |

## Customization

### 1. Update project identity

- **Name:** `package.json` → `"name"` field
- **Metadata:** `src/config/site.ts` → `siteConfig` object
- **Constants:** `src/lib/constants.ts` → `APP_NAME`, `API_BASE_URL`

### 2. Environment variables

Copy `.env.example` to `.env.local` and update values:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### 3. Add a new feature

1. Create model: `src/models/product.model.ts`
2. Add endpoints: `src/services/api/endpoints.ts`
3. Create action: `src/services/actions/product.action.ts`
4. Add store: `src/stores/use-product-store.ts`
5. Build components: `src/components/features/products/`
6. Create page: `src/app/products/page.tsx`
7. Write tests: `src/__tests__/product.test.tsx`

## License

MIT
