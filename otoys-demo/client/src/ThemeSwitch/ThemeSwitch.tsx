import React, {FC, useCallback} from 'react';
import { Button } from '@gravity-ui/uikit';
import { ThemeSwitchProps } from './ThemeSwitch.types';
import {cn} from './ThemeSwitch.cn';
import './ThemeSwitch.css';
import { useTheme } from '../ThemeProvider';
import {ReactComponent as IconThemeLight} from './ThemeSwitch.assets/theme-light.svg';
import {ReactComponent as IconThemeDark} from './ThemeSwitch.assets/theme-dark.svg';

export const ThemeSwitch: FC<ThemeSwitchProps> = props => {
    const {
        className,
    } = props;

    const { theme, setTheme } = useTheme();

    const handleClick = useCallback(() => {
        setTheme(currentTheme => {
            if (currentTheme === 'dark') return 'light';
            return 'dark';
        });
    }, [setTheme]);

    return (
        <Button
            className={cn(null, [className])}
            onClick={handleClick}
            view="outlined"
            size="l"
        >
            {theme === 'dark' && (
                <Button.Icon>
                    <IconThemeDark />
                </Button.Icon>
            )}
            {theme === 'light' && (
                <Button.Icon>
                    <IconThemeLight />
                </Button.Icon>
            )}
        </Button>
    );
};
