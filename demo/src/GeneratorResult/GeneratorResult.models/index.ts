import { createStore, createEvent } from 'effector';

export const $generatorResult = createStore('');
export const generatorResultChanged = createEvent<string>();

export const $isGeneratorResultInitialized = createStore(false);
export const generatorResultInitialized = createEvent<boolean>();
