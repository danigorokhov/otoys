import React, {FC} from 'react';
import { GeneratorResultViewerProps } from './GeneratorResultViewer.types';
import {cn} from './GeneratorResultViewer.cn';
import './GeneratorResultViewer.css';
import { CodeEditor } from '../CodeEditor';
import { Loader } from '@gravity-ui/uikit';

const CODE_EDITOR_OPTIONS = {
    readOnly: true,
};

export const GeneratorResultViewer: FC<GeneratorResultViewerProps> = props => {
    const {
        isLoading,
        value,
        className,
    } = props;

    if (isLoading) {
        return (
            <div className={cn(null, [className])}>
                <Loader size="m" />
            </div>
        );
    }

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
