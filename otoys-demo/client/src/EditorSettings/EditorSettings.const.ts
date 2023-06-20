import { ControlGroupOption } from '@gravity-ui/uikit';
import {EditorSettingsValues} from './EditorSettings.types';
import {i18n} from './EditorSettings.i18n';

export const LANGUAGE_JSON = 'json';
export const LANGUAGE_YAML = 'yaml';
export const LANGUAGE_OPTIONS: ControlGroupOption[] = [
    {
        content: i18n('field.lang.option.json'),
        value: LANGUAGE_JSON,
    },
    {
        content: i18n('field.lang.option.yaml'),
        value: LANGUAGE_YAML,
    },
];

export const EDITOR_SETTINGS_DEFAULT_VALUES: Partial<EditorSettingsValues> = {
    language: LANGUAGE_JSON,
};
