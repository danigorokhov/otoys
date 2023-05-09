import React, {FC} from 'react';
import { GeneratorResultProps } from './GeneratorResult.types';
import {cn} from './GeneratorResult.cn';
import './GeneratorResult.css';
import { Card } from '@gravity-ui/uikit';
import {GeneratorResultControls} from '../GeneratorResultControls';
import {GeneratorResultViewer} from '../GeneratorResultViewer';

export const GeneratorResult: FC<GeneratorResultProps> = props => {
    const {
        className,
    } = props;

    return (
        <Card className={cn(null, [className])}>
            <GeneratorResultControls />
            <GeneratorResultViewer />
        </Card>
    );
};
