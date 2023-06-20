import { createStore, createEvent, createEffect } from 'effector';
import {status} from 'patronum';
import {GeneratorSettings} from '../../../@types/generatorSettings';

export const $generatorResult = createStore('');
export const generatorResultChanged = createEvent<string>();

type LoadGeneratorResultParams = {
    generatorSettings: GeneratorSettings;
    document: string;
};

type LoadGeneratorResultFx = (params: LoadGeneratorResultParams) => Promise<string>;

type ApiGenerateResponse = { // TODO to generated types
    result: string;
};

export const loadGeneratorResultFx = createEffect<LoadGeneratorResultFx>(async params => {
    const response = await fetch('http://localhost:3030/api/generate', { // TODO to config.server.origin
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