import { createEffect, createEvent, createStore } from 'effector';
import { INITIAL_LANG, i18n } from '../i18n.const';
import { Lang } from '../i18n.types';
import { configure } from '@gravity-ui/uikit';

// Won't work without initialization
i18n.setLang(INITIAL_LANG);

export const $lang = createStore(INITIAL_LANG);
export const langChanged = createEvent<Lang>();

type ReflectLangInUIFx = (lang: Lang) => void;

export const reflectLangFx = createEffect<ReflectLangInUIFx>(lang => {
    configure({ lang });
    i18n.setLang(lang);
});
