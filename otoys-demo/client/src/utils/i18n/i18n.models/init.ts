import { sample } from 'effector';
import { $lang, langChanged, reflectLangFx } from '.';

sample({
    clock: langChanged,
    trigger: $lang,
});

sample({
    clock: $lang,
    trigger: reflectLangFx,
});
