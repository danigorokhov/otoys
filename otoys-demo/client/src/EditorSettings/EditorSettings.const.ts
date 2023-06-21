import {EditorSettingsValues} from './EditorSettings.types';

export const LANGUAGE_JSON = 'json';
export const LANGUAGE_YAML = 'yaml';

export const EDITOR_SETTINGS_DEFAULT_VALUES: Partial<EditorSettingsValues> = {
    language: LANGUAGE_JSON,
};
