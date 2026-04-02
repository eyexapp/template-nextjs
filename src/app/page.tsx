import { Header } from "@/components/layout/header";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold tracking-tight">
              Next.js Template
            </h1>
            <p className="max-w-lg text-lg text-foreground/60">
              Clean architecture, Zustand state management, and modern tooling —
              ready for your next project.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card
              title="Clean Architecture"
              description="Layered folder structure — models, services, stores, components — each with a clear responsibility."
            />
            <Card
              title="Zustand"
              description="Lightweight state management (~1KB) with SSR-safe patterns and intuitive API."
            />
            <Card
              title="Server Actions"
              description="Native data mutations with zero client-side overhead. Type-safe and secure by default."
            />
            <Card
              title="Tailwind CSS v4"
              description="Utility-first CSS with PostCSS integration, custom themes, and Geist font."
            />
            <Card
              title="TypeScript Strict"
              description="Full strict mode, path aliases, and shared type definitions across all layers."
            />
            <Card
              title="DX Tooling"
              description="ESLint, Prettier, Husky pre-commit hooks, and Vitest testing — all pre-configured."
            />
          </div>

          <div className="flex flex-col gap-2 text-sm text-foreground/40">
            <p>
              Edit{" "}
              <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-foreground/60">
                src/app/page.tsx
              </code>{" "}
              to get started.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function Card({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-foreground/10 p-5 transition-colors hover:border-foreground/20">
      <h3 className="mb-1.5 font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-foreground/60">
        {description}
      </p>
    </div>
  );
}
