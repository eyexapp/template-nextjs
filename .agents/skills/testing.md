---
name: testing
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - test
  - vitest
  - testing library
  - server component test
  - mock
---

# Testing — Next.js 16 (Vitest + React Testing Library)

## Server Component Testing

Server Components are async functions — test them as functions:

```tsx
import { render, screen } from '@testing-library/react';

it('should render user data', async () => {
  // Mock the data fetch
  vi.mock('@/services/user', () => ({
    getUser: vi.fn().mockResolvedValue({ name: 'Alice' }),
  }));

  const Component = await UserPage({ params: { id: '1' } });
  render(Component);
  expect(screen.getByText('Alice')).toBeInTheDocument();
});
```

## Client Component Testing

Same as React Testing Library — `render`, `userEvent`, `screen`:

```tsx
it('should toggle sidebar', async () => {
  render(<Sidebar />);
  await userEvent.click(screen.getByRole('button', { name: /menu/i }));
  expect(screen.getByRole('navigation')).toBeVisible();
});
```

## Server Action Testing

```tsx
import { createPost } from './actions';

it('should create post and revalidate', async () => {
  const formData = new FormData();
  formData.set('title', 'Test Post');

  const result = await createPost(formData);
  expect(result.id).toBeDefined();
});
```

## Route Handler Testing

```tsx
import { GET } from './route';

it('should return users', async () => {
  const request = new Request('http://localhost/api/users');
  const response = await GET(request);
  const data = await response.json();
  expect(data).toHaveLength(3);
});
```

## Mocking

- Mock `next/navigation`: `useRouter`, `useSearchParams`, `redirect`.
- Mock `next/headers`: `cookies()`, `headers()`.
- Use MSW for API call mocking in integration tests.

## Rules

- Test Server Components as async functions.
- Test Client Components with React Testing Library.
- Test Route Handlers by calling them directly.
- Mock external data sources, not Next.js internals where possible.
