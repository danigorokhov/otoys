import {sample} from 'effector';
import {$generatorResult, generatorResultInitialized, generatorResultChanged, $isGeneratorResultInitialized} from '.';

sample({
    clock: generatorResultChanged,
    target: $generatorResult,
});

sample({
    clock: generatorResultInitialized,
    target: $isGeneratorResultInitialized,
});
