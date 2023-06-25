import { createStore, createEvent, createEffect } from 'effector';
import {status} from 'patronum';
import {GeneratorSettings} from '../../../@types/generator';

export const $generatorResult = createStore('');
export const generatorResultChanged = createEvent<string>();

type LoadGeneratorResultParams = {
    document: string;
    generatorSettings: Omit<GeneratorSettings, 'type'>;
    generatorType: GeneratorSettings['type'];
};

type LoadGeneratorResultFx = (params: LoadGeneratorResultParams) => Promise<string>;

// TODO use otoys to generate types for interacting with API
// TODO common type with backend
type ApiGenerateResponse = {
    result: string;
};

export const loadGeneratorResultFx = createEffect<LoadGeneratorResultFx>(async params => {
    const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const { result } = await response.json() as ApiGenerateResponse;

    return result;
});

export const $generatorResultStatus = status({
    effect: loadGeneratorResultFx,
    defaultValue: 'pending',
});
