import { useContext } from "react";
import { Theme, ThemeContext } from "./ThemeContext";

interface UseThemeResult {
    theme: Theme;
    toggleTheme: () => void;
};

export function useTheme(): UseThemeResult {
    const {theme, setTheme} = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme = theme === Theme.LIGHT? Theme.DARK : Theme.LIGHT;
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return { theme, toggleTheme };
};