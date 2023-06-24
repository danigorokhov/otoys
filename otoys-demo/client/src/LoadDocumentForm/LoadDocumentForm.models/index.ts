import { createStore, createEffect, createEvent } from 'effector';

import { LoadDocumentFormValues } from '../LoadDocumentForm.types';

const LOAD_DOCUMENT_FORM_DEFAULT_VALUES: LoadDocumentFormValues = {
    documentType: 'file',
};

export const $loadDocumentParams = createStore(LOAD_DOCUMENT_FORM_DEFAULT_VALUES);
export const loadDocumentParamsChanged = createEvent<LoadDocumentFormValues>();

type LoadDocumentFx = (params: LoadDocumentFormValues) => Promise<string>;

// TODO handle success and failure via notifications
export const loadDocumentFx = createEffect<LoadDocumentFx>(async params => {
    const {
        documentType,
        file,
        url,
    } = params;

    if (documentType === 'file' && file) {
        const fileText = await file.text();

        return fileText;
    }

    if (documentType === 'remote' && url) {
        const response = await fetch(url);
        const text = await response.text();

        return text;
    }

    throw new Error('ValidationError: params are invalid');
});
