import React, {FC, useCallback, useEffect} from 'react';
import {useUnit} from 'effector-react';
import { SwaggerDocumentEditorProps, HandleChange } from './SwaggerDocumentEditor.types';
import {cn} from './SwaggerDocumentEditor.cn';
import { CodeEditor } from '../CodeEditor';
import './SwaggerDocumentEditor.css';
import petstore3 from './SwaggerDocumentEditor.assets/petstore3.json';
import { $swaggerDocument, swaggerDocumentInitialized, swaggerDocumentChanged, $isSwaggerDocumentInitialized, $editorLang } from './SwaggerDocumentEditor.models';
import { useUserMeta } from '../utils/userMeta';
import './SwaggerDocumentEditor.models/init';

const SWAGGER_DOCUMENT_DEFAULT_VALUE = JSON.stringify(petstore3, null, 4);

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

    const userMeta = useUserMeta();
    const swaggerDocumentInitialValue = userMeta?.document.content || SWAGGER_DOCUMENT_DEFAULT_VALUE;

    const [
        isSwaggerDocumentInitialized,
        setSwaggerDocumentInitialized,
    ] = useUnit([$isSwaggerDocumentInitialized, swaggerDocumentInitialized]);

    useEffect(() => {
        if (isSwaggerDocumentInitialized) return;

        setSwaggerDocument(swaggerDocumentInitialValue);
        setSwaggerDocumentInitialized(true);
    }, [isSwaggerDocumentInitialized, setSwaggerDocument, setSwaggerDocumentInitialized, swaggerDocumentInitialValue]);

    const [editorLang] = useUnit([$editorLang]);

    return (
        <CodeEditor
            className={cn(null, [className])}
            language={editorLang}
            value={swaggerDocument}
            onChange={handleChange}
            path="swaggerDocument.json"
        />
    );
};
