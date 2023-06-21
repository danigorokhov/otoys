import {I18N} from '@gravity-ui/i18n';
import { i18n } from '../i18n.const';

type RegisterKeysets = I18N['registerKeysets'];

export const registerKeysets: RegisterKeysets = (lang, data) => {
    i18n.registerKeysets(lang, data);
};
