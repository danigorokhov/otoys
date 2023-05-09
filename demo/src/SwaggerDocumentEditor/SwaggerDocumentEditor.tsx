import React, {FC, useCallback} from 'react';
import { SwaggerDocumentEditorProps, HandleChange } from './SwaggerDocumentEditor.types';
import {cn} from './SwaggerDocumentEditor.cn';
import DEFAULT_VALUE from './SwaggerDocumentEditor.assets/petstore3.json';
import { CodeEditor } from '../CodeEditor';
import './SwaggerDocumentEditor.css';

export const SwaggerDocumentEditor: FC<SwaggerDocumentEditorProps> = props => {
    const {
        className,
    } = props;

    const handleChange = useCallback<HandleChange>(_value => {
        // TODO handle _value
    }, []);

    return (
        <CodeEditor
            className={cn(null, [className])}
            language="json" // TODO support yaml
            defaultValue={JSON.stringify(DEFAULT_VALUE, null, 4)} // TODO support document loading
            onChange={handleChange}
            path="swaggerDocument.json"
        />
    );
};
