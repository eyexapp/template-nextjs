/**
 * Application-wide constants.
 * Update these values when setting up a new project.
 */
export const APP_NAME = "Next.js Template";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export const DEFAULT_LOCALE = "tr-TR";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  API_HEALTH: "/api/health",
} as const;
