import { sample } from 'effector';
import { $lang, langChanged, reflectLangFx } from '.';

sample({
    clock: langChanged,
    target: $lang,
});

sample({
    clock: $lang,
    target: reflectLangFx,
});
