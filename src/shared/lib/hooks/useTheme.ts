import { useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY } from '../../consts';
import { Theme } from '../../types/theme';

interface UseThemeResult {
    theme: Theme;
    toggleTheme: () => void;
}

export function useTheme(): UseThemeResult {
    const { theme = 'app_light_theme', setTheme } = useContext(ThemeContext);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        const newTheme =
            theme === 'app_light_theme' ? 'app_dark_theme' : 'app_light_theme';
        setTheme?.(newTheme);

        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return { theme, toggleTheme };
}
