import {sample, combine} from 'effector';
import {throttle} from 'patronum';
import { loadGeneratorResultFx } from '../../GeneratorResult';
import { $generatorSettings } from '../../GeneratorSettings';
import { $swaggerDocument, swaggerDocumentChanged } from '../../SwaggerDocumentEditor';
import { loadDocumentFx } from '../../LoadDocumentForm';

const $generatorParams = combine(
    $generatorSettings,
    $swaggerDocument,
    (generatorSettings, document) => {
        return {
            generatorSettings: {
                pathWhitelist: generatorSettings.pathWhitelist,
                typeSuffix: generatorSettings.typeSuffix,
            },
            generatorType: generatorSettings.type,
            document,
        };
    },
);

const $generatorParamsThrottled = throttle({
    source: $generatorParams,
    timeout: 1000,
});

sample({
    clock: $generatorParamsThrottled,
    target: loadGeneratorResultFx,
});

sample({
    clock: loadDocumentFx.doneData,
    target: swaggerDocumentChanged,
});
