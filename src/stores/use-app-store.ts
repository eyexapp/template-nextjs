import { create } from "zustand";

interface AppState {
  /** Current theme — "light" | "dark" | "system" */
  theme: "light" | "dark" | "system";
  setTheme: (theme: AppState["theme"]) => void;

  /** Sidebar open state */
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

/**
 * Application-level Zustand store.
 *
 * Usage:
 *   const theme = useAppStore((s) => s.theme);
 *   const setTheme = useAppStore((s) => s.setTheme);
 *
 * SSR-safe: Zustand stores are initialized on the client.
 * For SSR hydration, use a useEffect to sync server/client state.
 */
export const useAppStore = create<AppState>((set) => ({
  theme: "system",
  setTheme: (theme) => set({ theme }),

  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
