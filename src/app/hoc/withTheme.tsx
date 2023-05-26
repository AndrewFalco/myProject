import { ComponentType } from 'react';
import { useJsonSettings } from '@/entities/User';
import { ThemeProvider } from '@/shared/lib/providers/ThemeProvider';

export const withTheme = (Component: ComponentType) => () => {
    const { theme: defaultTheme } = useJsonSettings();

    return (
        <ThemeProvider initialTheme={ defaultTheme }>
            <Component />
        </ThemeProvider>
    );
};
