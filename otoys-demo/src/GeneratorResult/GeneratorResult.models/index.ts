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

export const loadGeneratorResultFx = createEffect<LoadGeneratorResultFx>(async params => {
    return 'type Hello = \'World!\';';
});

export const $generatorResultStatus = status({
    effect: loadGeneratorResultFx,
    defaultValue: 'pending',
});
