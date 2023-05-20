import { sample } from 'effector';
import {generatorSettingsSet, $generatorSettings} from '.';

sample({
    source: $generatorSettings,
    clock: generatorSettingsSet,
    fn: (state, payload) => ({
        ...state,
        ...payload,
    }),
    target: $generatorSettings,
});
