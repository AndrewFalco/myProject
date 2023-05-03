export type Theme = 'app_light_theme' | 'app_dark_theme';

export interface ThemeContextProps {
    theme?: Theme;
    setTheme?: (theme: Theme) => void;
}
