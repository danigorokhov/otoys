import {sample} from 'effector';
import {$generatorResult, generatorResultChanged, loadGeneratorResultFx} from '.';

sample({
    clock: generatorResultChanged,
    target: $generatorResult,
});

sample({
    clock: loadGeneratorResultFx.doneData,
    target: $generatorResult,
});
