# AGENTS.md — Next.js 16 Fullstack Application

## Project Identity

| Key | Value |
|-----|-------|
| Framework | Next.js 16 (App Router only) |
| Language | TypeScript 5 (strict mode) |
| Category | Fullstack SSR/SSG |
| State Management | Zustand (client state only) |
| Styling | Tailwind CSS v4 |
| Testing | Vitest + React Testing Library |
| Linting | ESLint 9 (flat config) + Prettier |
| Git Hooks | Husky + lint-staged |

---

## Architecture — App Router with Server/Client Split

```
src/
├── app/                ← PRESENTATION: Routes (Server Components by default)
│   ├── layout.tsx      ← Root layout
│   ├── page.tsx        ← Home page
│   ├── (auth)/         ← Auth route group
│   ├── (dashboard)/    ← Dashboard route group
│   ├── api/            ← API routes
│   └── <feature>/
│       ├── page.tsx
│       ├── layout.tsx
│       ├── loading.tsx
│       └── error.tsx
├── components/         ← PRESENTATION: Reusable UI
│   ├── ui/             ← Generic atoms (Button, Input, Card)
│   ├── layout/         ← Header, Footer, Sidebar
│   └── features/       ← Feature-specific components
├── hooks/              ← Custom hooks (client-side, "use client")
├── stores/             ← Zustand stores (client-side state)
├── services/
│   ├── api/            ← API client (fetch wrapper + endpoints)
│   └── actions/        ← Server Actions ("use server")
├── models/             ← TypeScript interfaces (*.model.ts)
├── types/              ← Shared utility types
├── lib/                ← Utilities: cn(), formatDate(), constants
├── config/             ← App configuration, site metadata
└── __tests__/          ← Test files
```

### Server vs Client Split

| Type | Directive | Where | Purpose |
|------|-----------|-------|---------|
| Server Component | None (default) | `app/`, `components/` | Data fetching, SEO, static rendering |
| Client Component | `"use client"` | `components/`, `hooks/` | Interactivity, state, browser APIs |
| Server Action | `"use server"` | `services/actions/` | Data mutations, form handling |
| API Route | Route handler | `app/api/` | External API endpoints |

### Strict Layer Rules

| Layer | Can Import From | NEVER Imports |
|-------|----------------|---------------|
| `app/` pages | components/, services/, models/ | stores/ (server components can't use) |
| `components/` | hooks/, types/, lib/ | stores/ (unless "use client"), services/ |
| `hooks/` | stores/, services/api/, types/ | app/, components/ |
| `stores/` | services/api/, types/ | app/, components/ |
| `services/api/` | models/, types/, lib/ | stores/, components/ |
| `services/actions/` | models/, lib/, external DB | stores/, components/ |

---

## Adding New Code — Where Things Go

### New Feature
1. **Model**: `src/models/product.model.ts`
2. **API endpoints**: Add to `src/services/api/endpoints.ts`
3. **Server Actions** (mutations): `src/services/actions/product.action.ts`
4. **Store** (client state): `src/stores/use-product-store.ts`
5. **Components**: `src/components/features/products/`
6. **Page**: `src/app/products/page.tsx`
7. **Tests**: `src/__tests__/product.test.tsx`

### New Page (Server Component by default)
```typescript
// src/app/products/page.tsx — Server Component (no "use client")
import { getProducts } from '@/services/api/client';

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductList products={products} />;
}
```

### New Client Component
```typescript
// src/components/features/products/product-filter.tsx
"use client"

import { useState } from 'react';

export function ProductFilter({ onFilter }: ProductFilterProps) {
  const [query, setQuery] = useState('');
  // ...
}
```

### New Server Action
```typescript
// src/services/actions/product.action.ts
"use server"

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  // Validate, save to DB, revalidate...
}
```

---

## Design & Architecture Principles

### Server Components First
- Components in `app/` are Server Components by DEFAULT
- Only add `"use client"` when the component needs interactivity, state, or browser APIs
- Keep client components small — push them to the leaves of the component tree
- Fetch data in Server Components — never in client components (use Server Actions for mutations)

### Data Flow Pattern
```
Read data:   Server Component → fetch in component body → render
Mutate data: Client Component → Server Action → revalidatePath/revalidateTag
Client state: Zustand stores (UI-only: theme, sidebar open, filters)
```

### Zustand — Client State ONLY
```typescript
// ✅ UI state in Zustand
export const useAppStore = create<AppState>()((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));

// ❌ NEVER cache server-fetched data in Zustand
// Use Server Components for server data
```

### API Client
```typescript
// ✅ Centralized fetch wrapper
import { apiClient } from '@/services/api/client';

const products = await apiClient.get<Product[]>('/api/products');
```

---

## Error Handling

### Route-Level Error Handling
```typescript
// src/app/products/error.tsx — Next.js error boundary
"use client"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Loading States
```typescript
// src/app/products/loading.tsx — Next.js loading UI
export default function Loading() {
  return <ProductListSkeleton />;
}
```

### Server Action Errors
```typescript
"use server"

export async function createProduct(formData: FormData) {
  try {
    // validate + save
    revalidatePath('/products');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to create product' };
  }
}
```

---

## Code Quality

### Naming Conventions
| Artifact | Convention | Example |
|----------|-----------|---------|
| Model | `*.model.ts` | `user.model.ts` |
| Server Action | `*.action.ts` | `login.action.ts` |
| Hook | `use-*.ts` | `use-media-query.ts` |
| Store | `use-*-store.ts` | `use-app-store.ts` |
| Component | kebab-case `.tsx` | `button.tsx`, `product-card.tsx` |
| Page | `page.tsx` | `app/dashboard/page.tsx` |
| Layout | `layout.tsx` | `app/(auth)/layout.tsx` |
| Loading | `loading.tsx` | Route-level loading UI |
| Error | `error.tsx` | Route-level error boundary |

### Path Aliases — Mandatory
```typescript
// ✅ Always use @/ alias
import { Button } from '@/components/ui/button';

// ❌ NEVER use relative imports
import { Button } from '../../components/ui/button';
```

### Tailwind Styling
```typescript
// ✅ Use cn() helper for conditional classes
import { cn } from '@/lib/utils';

<div className={cn('p-4', isActive && 'bg-primary', className)} />

// ❌ NEVER use inline styles or CSS modules
```

---

## Testing Strategy

| Level | What | Where | Tool |
|-------|------|-------|------|
| Unit | Hooks, stores, utils, services | `src/__tests__/` | Vitest |
| Component | Render + interaction | `src/__tests__/` | Vitest + RTL |
| E2E | User flows | `e2e/` | Playwright |

### What MUST Be Tested
- All Zustand stores
- All custom hooks
- All Server Actions (mock DB)
- Client components with user interaction
- API client error handling

---

## Security & Performance

### Security
- Server Actions run on the server — validate ALL inputs
- Environment variables: `NEXT_PUBLIC_` prefix for client-accessible only
- Never expose server secrets to client bundles
- Use `headers()` and `cookies()` for auth in Server Components

### Performance
- Server Components reduce client JS bundle (no hydration)
- Use `loading.tsx` for instant loading states (Suspense boundary)
- Use `generateStaticParams()` for static generation of dynamic routes
- Images: use `next/image` for automatic optimization
- Lazy-load client components with `dynamic(() => import(...), { ssr: false })`
- Use `revalidatePath` / `revalidateTag` for incremental cache updates

---

## Commands

| Action | Command |
|--------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Start prod | `npm run start` |
| Test | `npm test` |
| Lint | `npm run lint` |
| Type check | `npm run type-check` |
| Format | `npm run format` |

---

## Prohibitions — NEVER Do These

1. **NEVER** use Pages Router (`pages/`) — App Router only
2. **NEVER** install axios — use built-in `apiClient` from `services/api/`
3. **NEVER** use React Context for global state — use Zustand
4. **NEVER** use inline styles — Tailwind classes with `cn()`
5. **NEVER** fetch data in client components — use Server Components / Server Actions
6. **NEVER** cache server data in Zustand — it's for client/UI state only
7. **NEVER** add `"use client"` unnecessarily — Server Components are default
8. **NEVER** use `any` type — strict TypeScript
9. **NEVER** use relative imports — `@/` path alias always
10. **NEVER** expose server env vars to client (no `NEXT_PUBLIC_` for secrets)
