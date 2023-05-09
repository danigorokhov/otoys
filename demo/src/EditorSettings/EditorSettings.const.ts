import { ControlGroupOption } from '@gravity-ui/uikit';
import {EditorSettingsValues} from './EditorSettings.types';

export const LANGUAGE_JSON = 'json';
export const LANGUAGE_YAML = 'yaml';
export const LANGUAGE_OPTIONS: ControlGroupOption[] = [
    {
        content: 'JSON',
        value: LANGUAGE_JSON,
    },
    {
        content: 'YAML',
        value: LANGUAGE_YAML,
    },
];

export const EDITOR_SETTINGS_DEFAULT_VALUES: Partial<EditorSettingsValues> = {
    language: LANGUAGE_JSON,
};
