import { useAppStore } from "../lib/store";
import { Button } from "./ui/button";
import { useEffect } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useAppStore();

  // Sync with <html class="dark">
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Button variant="outline" size="sm" onClick={toggleTheme}>
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </Button>
  );
}
