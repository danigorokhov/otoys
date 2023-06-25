import {PropsWithChildren} from 'react';
import {ClassNameProps} from '../../@types/className';
import { LANGUAGE_JSON, LANGUAGE_YAML } from './EditorSettings.const';
import {WatchObserver} from 'react-hook-form';

export type EditorSettingsProps = PropsWithChildren<{}> & ClassNameProps;

export type EditorSettingsValues = {
    language: typeof LANGUAGE_JSON | typeof LANGUAGE_YAML; // TODO merge with type from SwaggerDocumentEditor
};

export type HandleChange = WatchObserver<EditorSettingsValues>;
