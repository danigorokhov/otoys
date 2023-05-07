import {useContext} from 'react';
import {I18nContextValue, I18nContext} from '../I18nProvider.context';

type UseLang = () => I18nContextValue;

export const useLang: UseLang = () => {
    return useContext(I18nContext);
};
