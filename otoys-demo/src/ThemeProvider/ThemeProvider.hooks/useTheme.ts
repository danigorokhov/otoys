import {useContext} from 'react';
import {ThemeContext, ThemeContextValue} from '../ThemeProvider.context';

type UseTheme = () => ThemeContextValue;

export const useTheme: UseTheme = () => {
    return useContext(ThemeContext);
};
