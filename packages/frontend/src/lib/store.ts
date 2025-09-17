import { create } from "zustand";

interface AppState {
  user: string | null;
  setUser: (user: string | null) => void;

  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  theme: "light",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));
