import { ReactNode, useEffect } from "react";
import { useAppStore } from "@/lib/store";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useAppStore();
  const persistedTheme = localStorage.getItem("theme");

  useEffect(() => {
    if (theme === "dark" || persistedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return <>{children}</>;
}
