import {sample} from 'effector';
import {$swaggerDocument, swaggerDocumentInitialized, swaggerDocumentChanged, $isSwaggerDocumentInitialized, $editorLang, editorLangChanged} from '.';

sample({
    clock: swaggerDocumentChanged,
    target: $swaggerDocument,
});

sample({
    clock: swaggerDocumentInitialized,
    target: $isSwaggerDocumentInitialized,
});

sample({
    clock: editorLangChanged,
    target: $editorLang,
});
