import { I18N, I18NFn, KeysetData } from '@gravity-ui/i18n';

export type Lang = 'ru' | 'en';

export type I18nKeysetFn<KD extends KeysetData> = ReturnType<I18NFn<KD>['keyset']>;

export type GetI18nKeysetFn<KD extends KeysetData> = (
    i18n: I18N
) => I18nKeysetFn<KD>;
