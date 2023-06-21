import { I18NFn } from '@gravity-ui/i18n';
import { GetI18nKeysetFn, registerKeysets } from '../../utils/i18n';
import en from './en.json';
import ru from './ru.json';

registerKeysets('en', en);
registerKeysets('ru', ru);

type KeysetData = typeof en | typeof ru;

export const getI18nKeysetFn: GetI18nKeysetFn<KeysetData> = i18nBase => {
    const i18nFnTyped = i18nBase.i18n as I18NFn<KeysetData>;
    const i18nKeysetFn = i18nFnTyped.bind(i18nBase, 'FileInput');

    return i18nKeysetFn;
};
