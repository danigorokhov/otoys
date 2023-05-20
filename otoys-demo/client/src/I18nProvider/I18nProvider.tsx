import React, {FC, useState, useEffect, useMemo} from 'react';
import {configure} from '@gravity-ui/uikit';
import {I18nProviderProps} from './I18nProvider.types';
import {INITIAL_LANG} from './I18nProvider.const';
import {I18nContext} from './I18nProvider.context';

export const I18nProvider: FC<I18nProviderProps> = props => {
    const {
        initialLang = INITIAL_LANG,
        children,
    } = props;

    const [lang, setLang] = useState(initialLang);
    const i18nContextValue = useMemo(() => ({
        lang,
        setLang,
    }), [lang]);

    useEffect(() => {
        configure({lang});
    }, [lang]);

    return (
        <I18nContext.Provider value={i18nContextValue}>
            {children}
        </I18nContext.Provider>
    );
};
