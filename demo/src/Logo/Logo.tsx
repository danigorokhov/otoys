import React, {FC} from 'react';
import { LogoProps } from './Logo.types';
import {cn} from './Logo.cn';
import teddyBear from './Logo.assets/teddy-bear.png';
import './Logo.css';
import { Text } from '@gravity-ui/uikit';

export const Logo: FC<LogoProps> = props => {
    const {
        className,
    } = props;

    return (
        <div className={cn(null, className)}>
            <img
                src={teddyBear}
                alt="Teddy bear"
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
