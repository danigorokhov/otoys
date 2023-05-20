import {FC, useState, useMemo} from 'react';
import {ThemeProvider as ThemeProviderUIKit} from '@gravity-ui/uikit';
import {cn} from './ThemeProvider.cn';
import {ThemeProviderProps} from './ThemeProvider.types';
import {INITIAL_THEME} from './ThemeProvider.const';
import {ThemeContext} from './ThemeProvider.context';

import './ThemeProvider.css';
import '@gravity-ui/uikit/styles/styles.css';

export const ThemeProvider: FC<ThemeProviderProps> = props => {
    const {
        initialTheme = INITIAL_THEME,
        children,
    } = props;

    const [theme, setTheme] = useState(initialTheme);
    const themeContextValue = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    return (
        <ThemeContext.Provider value={themeContextValue}>
            <ThemeProviderUIKit
                rootClassName={cn()}
                nativeScrollbar={false}
                theme={theme}
            >
                {children}
            </ThemeProviderUIKit>
        </ThemeContext.Provider>
    );
};
