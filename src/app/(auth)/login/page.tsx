export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-xl border border-foreground/10 p-8">
        <h1 className="mb-6 text-2xl font-bold">Login</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="h-10 rounded-lg border border-foreground/20 bg-transparent px-3 text-sm outline-none focus:border-foreground/40"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-10 rounded-lg border border-foreground/20 bg-transparent px-3 text-sm outline-none focus:border-foreground/40"
            />
          </div>
          <button
            type="submit"
            className="mt-2 h-10 rounded-lg bg-foreground font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
