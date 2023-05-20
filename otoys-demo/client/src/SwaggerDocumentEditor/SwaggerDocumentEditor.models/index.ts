import { createStore, createEvent } from 'effector';

export const $swaggerDocument = createStore('');
export const swaggerDocumentChanged = createEvent<string>();

export const $isSwaggerDocumentInitialized = createStore(false);
export const swaggerDocumentInitialized = createEvent<boolean>();
