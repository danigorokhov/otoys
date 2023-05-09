import React, {FC} from 'react';
import { SwaggerDocumentEditorProps } from './SwaggerDocumentEditor.types';
import {cn} from './SwaggerDocumentEditor.cn';
import './SwaggerDocumentEditor.css';
import MonacoEditor from '@monaco-editor/react';
import DEFAULT_VALUE from './examples/v3/petstore3.json'; // TODO polish

export const SwaggerDocumentEditor: FC<SwaggerDocumentEditorProps> = props => {
    const {
        className,
    } = props;

    return (
        <MonacoEditor
            className={cn(null, [className])}
            theme={'vs-dark'}
            // theme={'light'} // TODO support light theme
            language={'json'} // TODO support yaml
            defaultValue={JSON.stringify(DEFAULT_VALUE, null, 4)}
            onChange={() => {}}
        />
    );
};
