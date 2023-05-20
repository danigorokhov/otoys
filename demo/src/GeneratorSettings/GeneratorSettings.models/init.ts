import { sample } from 'effector';
import {setGeneratorSettings, $generatorSettings} from '.';

sample({
    source: $generatorSettings,
    clock: setGeneratorSettings,
    fn: (state, payload) => ({
        ...state,
        ...payload,
    }),
    target: $generatorSettings,
});
