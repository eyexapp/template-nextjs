---
name: architecture
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - architecture
  - app router
  - server component
  - client component
  - layout
  - routing
  - ssr
  - rsc
---

# Architecture — Next.js 16 (App Router)

## Server vs Client Components

- **Default is Server Component** — runs on server, zero JS shipped to client.
- Add `'use client'` directive ONLY when component needs: useState, useEffect, event handlers, browser APIs.
- Keep `'use client'` boundary as low as possible in the tree.
- Server Components can import Client Components, but NOT vice versa.
- Pass server data to client components via props, not by importing server modules.

## App Router Structure

```
src/app/
├── layout.tsx        ← Root layout (html, body, providers)
├── page.tsx          ← Home page (/)
├── loading.tsx       ← Loading UI (auto Suspense boundary)
├── error.tsx         ← Error boundary ('use client' required)
├── not-found.tsx     ← 404 page
├── (auth)/           ← Route group (no URL segment)
│   ├── login/page.tsx
│   └── register/page.tsx
├── (dashboard)/      ← Route group with shared layout
│   ├── layout.tsx    ← Dashboard layout
│   └── settings/page.tsx
└── api/              ← Route Handlers (API endpoints)
    └── users/route.ts
```

## Data Fetching

- **Server Components**: `async function` + direct `fetch()` or DB calls.
- **Client Components**: TanStack Query or SWR for client-side fetching.
- Server Actions (`'use server'`) for mutations from client components.
- Use `revalidatePath()` / `revalidateTag()` for cache invalidation.
- Never fetch in layout.tsx — fetches in layouts block all child pages.

## State Management

- **Server state**: fetched in Server Components, passed as props.
- **Client state**: Zustand stores (only in `'use client'` components).
- **URL state**: `useSearchParams()` for filters, pagination.
- Minimize client state — prefer server state flowing down.

## Metadata & SEO

```tsx
// Static
export const metadata: Metadata = { title: 'Dashboard' };

// Dynamic
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.id);
  return { title: product.name };
}
```

## Directory Structure

```
src/
├── app/            ← Routes, layouts, API routes, loading/error boundaries
├── components/     ← Shared UI (ui/ for atoms, layout/ for scaffolding)
├── hooks/          ← Client-side hooks ('use client')
├── stores/         ← Zustand stores (client state only)
├── services/       ← Business logic, data access
├── lib/            ← Third-party wrappers, utilities
└── types/          ← TypeScript interfaces
```

## Rules

- Default to Server Components. Add 'use client' only when needed.
- No `fetch()` in layouts — blocks entire page tree.
- Use route groups `(name)` for organization without URL impact.
- Parallel routes `@slot` for complex layouts (modals, sidebars).
