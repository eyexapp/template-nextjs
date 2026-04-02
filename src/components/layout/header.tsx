import { siteConfig } from "@/config/site";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-foreground/10">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold">
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-4">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/60 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
