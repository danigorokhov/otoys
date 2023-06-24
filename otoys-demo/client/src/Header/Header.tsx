import React, {FC, useEffect} from 'react';
import { HeaderProps } from './Header.types';
import {cn} from './Header.cn';
import './Header.css';
import {Logo} from '../Logo';
import {LangSwitch} from '../LangSwitch';
import {ThemeSwitch} from '../ThemeSwitch';
import {ReactComponent as ExternalLinkIcon} from './Header.assets/external-link.svg';
import { Link, Text } from '@gravity-ui/uikit';

let yIdInitialized = false;

export const Header: FC<HeaderProps> = props => {
    const {
        className,
    } = props;

    useEffect(() => {
        if (yIdInitialized) return;

        // @ts-ignore
        window.YaAuthSuggest.init({
            client_id: '820a260202514b2db22ce8840cf0ee31',
            response_type: 'token',
            redirect_uri: 'https://local.otoys.tech:3000/suggest/token',
        },
        'https://local.otoys.tech:3000',
        {
            view: 'button',
            parentId: 'yIdContainer',
            buttonView: 'main',
            buttonTheme: 'dark',
            buttonSize: 'xs',
            buttonBorderRadius: 6,
        },
        )
            .then(({
                // @ts-ignore
                handler,
            }) => {
                return handler();
            })
            // @ts-ignore
            .then(data => console.log('Сообщение с токеном', data))
            // @ts-ignore
            .catch(error => console.log('Обработка ошибки', error));

        yIdInitialized = true;
    }, []);

    return (
        <header className={cn(null, [className])}>
            <Logo />

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

            {/* TODO
            <UserId />
            */}
        </header>
    );
};
