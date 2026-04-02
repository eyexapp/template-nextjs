/**
 * API endpoint constants.
 * Centralize all API endpoints here for easy maintenance.
 *
 * Usage:
 *   import { ENDPOINTS } from "@/services/api/endpoints";
 *   const users = await apiClient.get(ENDPOINTS.USERS.LIST);
 */
export const ENDPOINTS = {
  HEALTH: "/health",

  USERS: {
    LIST: "/users",
    DETAIL: (id: string) => `/users/${id}`,
    CREATE: "/users",
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },

  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
} as const;
