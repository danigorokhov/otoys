import React, {FC} from 'react';
import { Text } from '@gravity-ui/uikit';
import { useI18n } from '../utils/i18n';
import { LogoProps } from './Logo.types';
import {cn} from './Logo.cn';
import { getI18nKeysetFn } from './Logo.i18n';
import teddyBear from './Logo.assets/teddy-bear.png';
import './Logo.css';

export const Logo: FC<LogoProps> = props => {
    const {
        className,
    } = props;

    const { i18n } = useI18n(getI18nKeysetFn);

    return (
        <div className={cn(null, className)}>
            <img
                src={teddyBear}
                alt={i18n('alt')}
                width={32}
                height={32}
            />
            <Text
                className={cn('Text')}
                variant="header-2"
            >
                otoys
            </Text>
        </div>
    );
};
