import { I18NFn } from '@gravity-ui/i18n';
import { i18n as i18nBase } from '../../utils/i18n';
import en from './en.json';
import ru from './ru.json';

i18nBase.registerKeysets('en', en);
i18nBase.registerKeysets('ru', ru);

const i18nTyped = i18nBase.i18n as I18NFn<typeof en | typeof ru>;
const i18nKeyset = i18nTyped.bind(i18nBase, 'FileInput');

export { i18nKeyset as i18n };
