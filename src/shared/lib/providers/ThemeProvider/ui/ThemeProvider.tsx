import { ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { Theme } from '../../../../types/theme';

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const { children, initialTheme } = props;
    const [isThemeInited, setIsThemeInited] = useState(false);
    const [theme, setTheme] = useState<Theme>(initialTheme || 'app_dark_theme');

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
