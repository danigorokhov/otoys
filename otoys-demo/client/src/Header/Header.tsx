import React, {FC} from 'react';
import { HeaderProps } from './Header.types';
import {cn} from './Header.cn';
import './Header.css';
import {Logo} from '../Logo';
import {LangSwitch} from '../LangSwitch';
import {ThemeSwitch} from '../ThemeSwitch';
import {YIdAuthControl} from '../YIdAuthControl';
import {ReactComponent as ExternalLinkIcon} from './Header.assets/external-link.svg';
import { Link, Text } from '@gravity-ui/uikit';

export const Header: FC<HeaderProps> = props => {
    const {
        className,
    } = props;

    return (
        <header className={cn(null, [className])}>
            <Logo />

            <YIdAuthControl />
            <LangSwitch />
            <ThemeSwitch />
            <Link
                className={cn('ExternalLink')}
                view="primary"
                href="https://github.com/DaniilGorokhov/otoys"
            >
                <Text variant="body-2">GitHub</Text>
                <ExternalLinkIcon className={cn('ExternalLinkIcon')} />
            </Link>
        </header>
    );
};
