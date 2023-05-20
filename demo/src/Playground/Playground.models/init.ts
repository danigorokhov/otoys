import {sample, combine} from 'effector';
import {throttle} from 'patronum';
import { loadGeneratorResultFx } from '../../GeneratorResult';
import { $generatorSettings } from '../../GeneratorSettings';
import { $swaggerDocument } from '../../SwaggerDocumentEditor';

const $generatorParams = combine(
    $generatorSettings,
    $swaggerDocument,
    (generatorSettings, document) => ({
        generatorSettings,
        document,
    }),
);

const $generatorParamsThrottled = throttle({
    source: $generatorParams,
    timeout: 1000,
});

sample({
    clock: $generatorParamsThrottled,
    target: loadGeneratorResultFx,
});
