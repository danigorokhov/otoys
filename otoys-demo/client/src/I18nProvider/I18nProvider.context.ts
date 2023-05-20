import {createContext} from 'react';
import {Lang} from './I18nProvider.types';
import {INITIAL_LANG} from './I18nProvider.const';

export type I18nContextValue = {
    lang: Lang;
    setLang: (newLang: Lang) => void;
};

export const I18nContext = createContext<I18nContextValue>({
    lang: INITIAL_LANG,
    setLang: () => {},
});
