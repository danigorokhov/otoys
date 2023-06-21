import { useMemo } from 'react';
import { useUnit } from 'effector-react';
import { KeysetData } from '@gravity-ui/i18n';
import { GetI18nKeysetFn } from '../i18n.types';
import { i18n } from '../i18n.const';
import { $lang } from '../i18n.models';

export const useI18n = <KD extends KeysetData>(getI18nKeysetFn: GetI18nKeysetFn<KD>) => {
    // Subscribe on lang changes
    const lang = useUnit($lang);

    return useMemo(() => {
        const i18nKeysetFn = getI18nKeysetFn(i18n);

        return {
            lang,
            i18n: i18nKeysetFn,
        };
    }, [getI18nKeysetFn, lang]);
};
