import { create } from "zustand";

export const useThemeStore = create((set, get) => ({
  theme: "light",
  toggleTheme: () => {
    const newTheme = get().theme === "light" ? "dark" : "light";
    set({ theme: newTheme });

    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }
}));
