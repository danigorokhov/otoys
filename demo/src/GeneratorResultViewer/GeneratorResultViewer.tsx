import React, {FC} from 'react';
import { GeneratorResultViewerProps } from './GeneratorResultViewer.types';
import {cn} from './GeneratorResultViewer.cn';
import './GeneratorResultViewer.css';
import { CodeEditor } from '../CodeEditor';

const CODE_EDITOR_OPTIONS = {
    readOnly: true,
};

export const GeneratorResultViewer: FC<GeneratorResultViewerProps> = props => {
    const {
        value,
        className,
    } = props;

    return (
        <CodeEditor
            className={cn(null, [className])}
            language="typescript"
            value={value}
            options={CODE_EDITOR_OPTIONS}
            path="generatorResult.ts"
        />
    );
};
