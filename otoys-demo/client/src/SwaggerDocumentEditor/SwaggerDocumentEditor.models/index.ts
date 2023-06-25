import { createStore, createEvent } from 'effector';
import { EditorLang } from '../SwaggerDocumentEditor.types';

export const $swaggerDocument = createStore('');
export const swaggerDocumentChanged = createEvent<string>();

export const $isSwaggerDocumentInitialized = createStore(false);
export const swaggerDocumentInitialized = createEvent<boolean>();

export const $editorLang = createStore<EditorLang>('json');
export const editorLangChanged = createEvent<EditorLang>();
