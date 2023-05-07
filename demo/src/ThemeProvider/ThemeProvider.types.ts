import {PropsWithChildren} from 'react';

export type Theme = 'light' | 'dark';

export type ThemeProviderProps = PropsWithChildren<{
    initialTheme?: Theme;
}>;
