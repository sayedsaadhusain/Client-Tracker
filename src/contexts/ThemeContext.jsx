
import React, { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("system");
  const { toast } = useToast();

  useEffect(() => {
    // Check for system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        document.documentElement.classList.toggle("dark", mediaQuery.matches);
      }
    };

    // Load saved theme or use system preference
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);

    if (savedTheme === "system") {
      document.documentElement.classList.toggle("dark", mediaQuery.matches);
    } else {
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const toggleTheme = () => {
    const themeOrder = ["light", "dark", "system"];
    const currentIndex = themeOrder.indexOf(theme);
    const newTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", systemDark);
    } else {
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }

    toast({
      title: "Theme Changed",
      description: `Switched to ${newTheme} theme`,
      duration: 2000,
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
