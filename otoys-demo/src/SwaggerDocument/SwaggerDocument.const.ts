import { TabsItemProps } from '@gravity-ui/uikit';

export const TAB_EDITOR_ID = 'editor';
export const TAB_GENERATOR_SETTINGS_ID = 'generatorSettings';
export const TAB_EDITOR_SETTINGS_ID = 'editorSettings';
export const TAB_LOAD_DOCUMENT_ID = 'loadDocument';

// TODO i18n
export const TABS: TabsItemProps[] = [
    {
        id: TAB_EDITOR_ID,
        title: 'Editor',
    },
    {
        id: TAB_EDITOR_SETTINGS_ID,
        title: 'Editor settings',
    },
    {
        id: TAB_GENERATOR_SETTINGS_ID,
        title: 'Generator settings',
    },
    {
        id: TAB_LOAD_DOCUMENT_ID,
        title: 'Load document',
    },
];
