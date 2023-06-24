import {createContext} from 'react';
import {Theme} from './ThemeProvider.types';
import {INITIAL_THEME} from './ThemeProvider.const';

export type ThemeContextValue = {
    theme: Theme;
    setTheme: (newTheme: Theme | ((currentTheme: Theme) => Theme)) => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
    theme: INITIAL_THEME,
    setTheme: () => {},
});
