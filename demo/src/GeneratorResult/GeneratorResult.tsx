import React, {FC} from 'react';
import { GeneratorResultProps } from './GeneratorResult.types';
import {cn} from './GeneratorResult.cn';
import './GeneratorResult.css';

export const GeneratorResult: FC<GeneratorResultProps> = props => {
    const {
        className,
    } = props;

    return (
        <div>
            {/* TODO
                <GeneratorResultControls />
                <CodeViewer />
            */}
        </div>
    );
};
