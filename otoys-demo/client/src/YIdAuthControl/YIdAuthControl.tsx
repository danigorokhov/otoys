import React, {FC, useCallback} from 'react';
import { YIdAuthControlProps } from './YIdAuthControl.types';
import {cn} from './YIdAuthControl.cn';
import './YIdAuthControl.css';
import { useUserMeta } from '../utils/userMeta';
import { useI18n } from '../utils/i18n';
import { Button } from '@gravity-ui/uikit';
import {ReactComponent as YaEngLogo} from './YIdAuthControl.assets/ya-eng-logo.svg';
import {ReactComponent as YaLogo} from './YIdAuthControl.assets/ya-logo.svg';

export const YIdAuthControl: FC<YIdAuthControlProps> = props => {
    const {
        className,
    } = props;

    const {lang} = useI18n(i18n => i18n.keyset('')); // TODO get rid of parameter

    const userMeta = useUserMeta();

    const handleClick = useCallback(() => {
        const clientId = '820a260202514b2db22ce8840cf0ee31';
        const redirectUri = 'https://local.otoys.tech/api/auth/token';
        window.location.href =
            `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    }, []);

    const iconLocalized = lang === 'ru' ? (
        <YaLogo />
    ) : (
        <YaEngLogo />
    );

    return (
        <div className={cn(null, [className])}>
            {/* TODO user picture */}
            {userMeta?.id ? (
                <>
                    <div className={cn('UserId')} />
                </>
            ) : (
                <Button
                    className={cn(null, [className])}
                    onClick={handleClick}
                    view="outlined"
                    size="l"
                >
                    <Button.Icon>
                        {iconLocalized}
                    </Button.Icon>
                </Button>
            )}
        </div>
    );
};
