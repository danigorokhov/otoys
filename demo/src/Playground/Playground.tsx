import React, {FC} from 'react';
import { PlaygroundProps } from './Playground.types';
import {cn} from './Playground.cn';
import './Playground.css';
import {SwaggerDocument} from '../SwaggerDocument';
import {GeneratorResult} from '../GeneratorResult';

export const Playground: FC<PlaygroundProps> = props => {
    const {
        className,
    } = props;

    return (
        <div className={cn(null, className)}>
            <SwaggerDocument />
            <GeneratorResult />
        </div>
    );
};
