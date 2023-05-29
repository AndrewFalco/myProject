import { ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { Theme } from '../../../../types/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/consts';

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

const ThemeProvider = (props: ThemeProviderProps) => {
    const { children, initialTheme } = props;
    const [isThemeInited, setIsThemeInited] = useState(false);
    const [theme, setTheme] = useState<Theme>(initialTheme || fallbackTheme || 'app_dark_theme');

    useEffect(() => {
        if (isThemeInited && initialTheme) {
            setTheme(initialTheme);
            setIsThemeInited(true);
        }
    }, [initialTheme, isThemeInited]);

    const defaultProps = useMemo(() => ({ theme, setTheme }), [theme]);

    return <ThemeContext.Provider value={ defaultProps }>{ children }</ThemeContext.Provider>;
};

export default ThemeProvider;
