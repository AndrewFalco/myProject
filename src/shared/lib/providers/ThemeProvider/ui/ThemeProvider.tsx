import { ReactNode, useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line falco-custom-fsd-plugin/layer-imports
import { useJsonSettings } from '@/entities/User';
import { ThemeContext } from '../../../context/ThemeContext';
import { Theme } from '../../../../types/theme';

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const { children, initialTheme } = props;
    const { theme: defaultTheme } = useJsonSettings();
    const [isThemeInited, setIsThemeInited] = useState(false);
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme || 'app_dark_theme');

    useEffect(() => {
        if (isThemeInited && defaultTheme) {
            setTheme(defaultTheme);
            setIsThemeInited(true);
        }
    }, [defaultTheme, isThemeInited]);

    const defaultProps = useMemo(() => ({ theme, setTheme }), [theme]);

    return (
        <ThemeContext.Provider value={ defaultProps }>
            { children }
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
