import {sample} from 'effector';
import { $loadDocumentParams, loadDocumentFx, loadDocumentParamsChanged } from '.';

sample({
    clock: loadDocumentParamsChanged,
    target: $loadDocumentParams,
});

sample({
    clock: $loadDocumentParams,
    target: loadDocumentFx,
});
