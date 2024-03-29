import { Theme } from '@/shared/types/theme';

export interface JsonSettings {
    theme?: Theme;
    isFirstVisit?: boolean;
    settingsPageHasBeenOpen?: boolean;
    isAppRedesigned?: boolean;
}
