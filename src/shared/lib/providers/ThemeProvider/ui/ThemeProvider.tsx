import { ReactNode, useMemo, useState } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY } from '../../../../consts';
import { Theme } from '../../../../types/theme';

const defaultTheme =
    (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) ||
    'app_light_theme';

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const { children, initialTheme } = props;
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    const defaultProps = useMemo(() => ({ theme, setTheme }), [theme]);

    return (
        <ThemeContext.Provider value={ defaultProps }>
            { children }
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
