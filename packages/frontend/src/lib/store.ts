import { create } from "zustand";

interface AppState {
  user: string | null;
  setUser: (user: string | null) => void;

  theme: "light" | "dark";
  toggleTheme: () => void;
}

const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "light";

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  theme: savedTheme,
  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", nextTheme);
      // Apply immediately to <html> so UI updates instantly
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return { theme: nextTheme };
    }),
}));
