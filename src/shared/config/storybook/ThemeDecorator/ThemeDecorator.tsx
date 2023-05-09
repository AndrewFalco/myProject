import { StoryFn } from '@storybook/react';
import { Theme } from '../../../types/theme';
import { ThemeProvider } from '../../../lib/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: StoryFn) =>
    (
        <ThemeProvider initialTheme={ theme }>
            <div className={ `app ${theme}` }>
                <StoryComponent />
            </div>
        </ThemeProvider>
    );
