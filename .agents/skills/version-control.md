---
name: version-control
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - git
  - commit
  - ci
  - deploy
  - build
  - vercel
---

# Version Control — Next.js 16

## Commits (Conventional)

`<type>(<scope>): <description>`

Examples:
- `feat(auth): add login page with Server Action`
- `fix(api): handle missing params in route handler`
- `refactor(dashboard): convert to Server Component`

## CI Pipeline

1. `npm ci`
2. `npx tsc --noEmit` — type check
3. `npm run lint` — ESLint with next plugin
4. `npm test -- --coverage` — Vitest
5. `npm run build` — full Next.js build (catches SSR errors)

## Build Artifacts

- `.next/` — never commit. Production output.
- `next.config.ts` — build configuration.
- `npm run build` also catches: Server Component async errors, metadata issues, route conflicts.

## .gitignore

```
node_modules/
.next/
.env.local
.env.production
coverage/
```

## Deployment

- Vercel: auto-detected, zero config.
- Self-hosted: `npm run build && npm start`.
- Docker: multi-stage build with `standalone` output.
- Environment variables: set in deployment platform, not committed.
