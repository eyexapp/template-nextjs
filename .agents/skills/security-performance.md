---
name: security-performance
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - security
  - performance
  - caching
  - ssr
  - static
  - image optimization
  - middleware
---

# Security & Performance — Next.js 16

## Performance

### Rendering Strategies

- **Static (SSG)**: Default for pages without dynamic data. Fastest.
- **Dynamic (SSR)**: Use `dynamic = 'force-dynamic'` or uncached `fetch()`.
- **ISR**: `revalidate = 60` — static page rebuilt every 60 seconds.
- Choose static unless you need request-time data (auth, personalization).

### Caching

```tsx
// Cached by default (static)
const data = await fetch('https://api.example.com/posts');

// Opt out of cache (dynamic)
const data = await fetch('https://api.example.com/posts', { cache: 'no-store' });

// Time-based revalidation
const data = await fetch('https://api.example.com/posts', { next: { revalidate: 60 } });
```

### Image Optimization

```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority  // for above-fold images
  placeholder="blur"
/>
```

- Always use `next/image` — auto WebP, responsive sizing, lazy loading.
- Set `priority` for LCP (largest contentful paint) images.

### Bundle Size

- Server Components ship ZERO JS — keep most logic server-side.
- Dynamic imports for heavy client libs: `dynamic(() => import('chart-lib'), { ssr: false })`.
- `@next/bundle-analyzer` to audit client bundle.

## Security

### Server-Side Protection

- Validate ALL inputs in Route Handlers and Server Actions with Zod.
- Use `server-only` package to prevent secret leakage to client.
- `cookies()` are httpOnly by default — don't override.
- Server Actions auto-include CSRF protection.

### Middleware

```tsx
// middleware.ts — runs on edge, BEFORE page render
export function middleware(request: NextRequest) {
  const token = request.cookies.get('session');
  if (!token) return NextResponse.redirect(new URL('/login', request.url));
}
export const config = { matcher: ['/dashboard/:path*'] };
```

### Headers

```tsx
// next.config.ts
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
];
```

### Environment Variables

- `NEXT_PUBLIC_*` — exposed to client bundle. NO secrets.
- Non-prefixed vars — server-only, safe for secrets.
- Validate env vars at build time with `@t3-oss/env-nextjs`.
