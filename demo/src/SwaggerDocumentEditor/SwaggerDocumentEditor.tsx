import React, {FC, useCallback, useEffect} from 'react';
import { SwaggerDocumentEditorProps, HandleChange } from './SwaggerDocumentEditor.types';
import {cn} from './SwaggerDocumentEditor.cn';
import { CodeEditor } from '../CodeEditor';
import './SwaggerDocumentEditor.css';
import SWAGGER_DOCUMENT_DEFAULT_VALUE from './SwaggerDocumentEditor.assets/petstore3.json';

import {useUnit} from 'effector-react';
import './SwaggerDocumentEditor.models/init';
import { $swaggerDocument, swaggerDocumentInitialized, swaggerDocumentChanged, $isSwaggerDocumentInitialized } from './SwaggerDocumentEditor.models';

export const SwaggerDocumentEditor: FC<SwaggerDocumentEditorProps> = props => {
    const {
        className,
    } = props;

    const [
        swaggerDocument,
        setSwaggerDocument,
    ] = useUnit([$swaggerDocument, swaggerDocumentChanged]);

    const handleChange = useCallback<HandleChange>(value => {
        setSwaggerDocument(value || '');
    }, [setSwaggerDocument]);

    const [
        isSwaggerDocumentInitialized,
        setSwaggerDocumentInitialized,
    ] = useUnit([$isSwaggerDocumentInitialized, swaggerDocumentInitialized]);

    useEffect(() => {
        if (isSwaggerDocumentInitialized) return;

        setSwaggerDocument(JSON.stringify(SWAGGER_DOCUMENT_DEFAULT_VALUE, null, 4));
        setSwaggerDocumentInitialized(true);
    }, [isSwaggerDocumentInitialized, setSwaggerDocument, setSwaggerDocumentInitialized]);

    return (
        <CodeEditor
            className={cn(null, [className])}
            language="json" // TODO support yaml
            defaultValue={swaggerDocument}
            onChange={handleChange}
            path="swaggerDocument.json"
        />
    );
};
