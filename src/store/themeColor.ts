import { create } from "zustand";

interface ThemeStore {
    theme: "light" | "dark";
    toggleTheme: () => void;
    setTheme: (t: "light" | "dark") => void;
};

export const useTheme = create<ThemeStore>((set) => {
    const storedTheme = (localStorage.getItem("theme") as "light" | "dark") || "light";

    document.documentElement.classList.toggle("dark", storedTheme === "dark");

    return {
        theme: storedTheme,
        toggleTheme: () =>
            set((state) => {
                const newTheme = state.theme === "light" ? "dark" : "light";
                document.documentElement.classList.toggle("dark", newTheme === "dark");
                localStorage.setItem("theme", newTheme);
                return { theme: newTheme };
            }),
        setTheme: (t) =>
            set(() => {
                document.documentElement.classList.toggle("dark", t === "dark");
                localStorage.setItem("theme", t);
                return { theme: t };
            }),
    };
});