import { createStore, createEvent } from 'effector';

import {GeneratorSettingsValues} from '../GeneratorSettings.types';

const GENERATOR_SETTINGS_DEFAULT_VALUES: GeneratorSettingsValues = {
    pathWhitelist: '',
};

export const $generatorSettings = createStore<GeneratorSettingsValues>(GENERATOR_SETTINGS_DEFAULT_VALUES);

export const generatorSettingsSet = createEvent<Partial<GeneratorSettingsValues>>();
