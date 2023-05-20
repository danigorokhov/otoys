import {PropsWithChildren} from 'react';

export type Lang = 'ru' | 'en';

export type I18nProviderProps = PropsWithChildren<{
    initialLang?: Lang;
}>;
