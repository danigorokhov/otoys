import { createStore, createEvent } from 'effector';
import { EditorSettingsValues } from '../EditorSettings.types';
import { LANGUAGE_JSON } from '../EditorSettings.const';

const EDITOR_SETTINGS_DEFAULT_VALUES: EditorSettingsValues = {
    language: LANGUAGE_JSON,
};

export const $editorSettings = createStore(EDITOR_SETTINGS_DEFAULT_VALUES);
export const editorSettingsChanged = createEvent<EditorSettingsValues>();
