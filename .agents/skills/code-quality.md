---
name: code-quality
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - clean code
  - naming
  - lint
  - server action
  - use client
  - use server
  - refactor
---

# Code Quality — Next.js 16 + TypeScript

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Page | `page.tsx` (file-based) | `app/dashboard/page.tsx` |
| Layout | `layout.tsx` | `app/(dashboard)/layout.tsx` |
| Route Handler | `route.ts` | `app/api/users/route.ts` |
| Server Action | verb + noun | `createUser`, `updateProfile` |
| Component | PascalCase | `UserCard.tsx` |
| Hook | `use` prefix | `useAuth()` |
| Store | `<domain>.store.ts` | `cart.store.ts` |

## Server/Client Boundary Rules

- `'use client'` at the TOP of a file, before any imports.
- `'use server'` for Server Actions (inline or separate file).
- Never import server-only code (DB, secrets) in client components.
- Use `server-only` package to prevent accidental client imports.

## Route Handler Patterns

```tsx
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = await getUsers(searchParams.get('page'));
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  // validate with zod
  const user = await createUser(body);
  return NextResponse.json(user, { status: 201 });
}
```

## Server Actions

```tsx
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  // validate, save to DB
  revalidatePath('/posts');
}
```

## Error Handling

- `error.tsx` — automatic error boundary per route segment.
- `not-found.tsx` — automatic 404 handling.
- `loading.tsx` — automatic Suspense boundary.
- Server Actions: return `{ error: string }` instead of throwing.

## Linting — ESLint 9

- `eslint-plugin-next` — Next.js specific rules.
- Warns on: missing `alt` on images, incorrect `next/link` usage, etc.
- Run `npm run lint` — type-check + lint together.
