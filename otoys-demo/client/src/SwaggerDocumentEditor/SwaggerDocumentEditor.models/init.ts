import {sample} from 'effector';
import {$swaggerDocument, swaggerDocumentInitialized, swaggerDocumentChanged, $isSwaggerDocumentInitialized} from '.';

sample({
    clock: swaggerDocumentChanged,
    target: $swaggerDocument,
});

sample({
    clock: swaggerDocumentInitialized,
    target: $isSwaggerDocumentInitialized,
});
