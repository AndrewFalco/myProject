import { createContext } from 'react';
import { ThemeContextProps } from '@/shared/types/theme';

export const ThemeContext = createContext<ThemeContextProps>({});
