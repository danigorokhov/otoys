import { TabsItemProps } from '@gravity-ui/uikit';
import {i18n} from './SwaggerDocument.i18n';

export const TAB_EDITOR_ID = 'editor';
export const TAB_GENERATOR_SETTINGS_ID = 'generatorSettings';
export const TAB_EDITOR_SETTINGS_ID = 'editorSettings';
export const TAB_LOAD_DOCUMENT_ID = 'loadDocument';

export const TABS: TabsItemProps[] = [
    {
        id: TAB_EDITOR_ID,
        title: i18n('tab.editor'),
    },
    {
        id: TAB_EDITOR_SETTINGS_ID,
        title: i18n('tab.editorSettings'),
    },
    {
        id: TAB_GENERATOR_SETTINGS_ID,
        title: i18n('tab.generatorSettings'),
    },
    {
        id: TAB_LOAD_DOCUMENT_ID,
        title: i18n('tab.loadDocument'),
    },
];
