import React, {FC} from 'react';
import { GeneratorResultControlsProps } from './GeneratorResultControls.types';
import {cn} from './GeneratorResultControls.cn';
import './GeneratorResultControls.css';
import { ClipboardButton } from '@gravity-ui/uikit';

export const GeneratorResultControls: FC<GeneratorResultControlsProps> = props => {
    const {
        className,
    } = props;

    return (
        <div className={cn(null, [className])}>
            <ClipboardButton size={16} text="TODO provide generated code" />
        </div>
    );
};
