import { APP_NAME } from "@/lib/constants";

export const siteConfig = {
  name: APP_NAME,
  description: "A modern Next.js template with clean architecture.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  nav: [
    { label: "Home", href: "/" },
    { label: "Login", href: "/login" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
