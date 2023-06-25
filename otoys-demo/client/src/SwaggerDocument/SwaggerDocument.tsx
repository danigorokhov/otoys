import React, {FC, useCallback, useMemo, useState} from 'react';
import { SwaggerDocumentProps, HandleSelectTab } from './SwaggerDocument.types';
import {cn} from './SwaggerDocument.cn';
import './SwaggerDocument.css';
import { Card, Tabs, TabsItemProps } from '@gravity-ui/uikit';
import {TAB_EDITOR_ID, TAB_GENERATOR_SETTINGS_ID, TAB_EDITOR_SETTINGS_ID, TAB_LOAD_DOCUMENT_ID} from './SwaggerDocument.const';
import {SwaggerDocumentEditor} from '../SwaggerDocumentEditor';
import {GeneratorSettings} from '../GeneratorSettings';
import {EditorSettings} from '../EditorSettings';
import {LoadDocumentForm} from '../LoadDocumentForm';
import { getI18nKeysetFn } from './SwaggerDocument.i18n';
import { useI18n } from '../utils/i18n';

import './SwaggerDocument.models/init';

export const SwaggerDocument: FC<SwaggerDocumentProps> = props => {
    const {
        className,
    } = props;

    const { i18n } = useI18n(getI18nKeysetFn);

    const tabs: TabsItemProps[] = useMemo(() => [
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
    ], [i18n]);

    const [activeTab, setActiveTab] = useState(TAB_EDITOR_ID);
    const handleSelectTab = useCallback<HandleSelectTab>(newActiveTab => {
        setActiveTab(newActiveTab);
    }, []);

    return (
        <Card className={cn(null, [className])}>
            <Tabs
                className={cn('Tabs')}
                activeTab={activeTab}
                onSelectTab={handleSelectTab}
                items={tabs}
                size="l"
            />

            {activeTab === TAB_EDITOR_ID && (
                <SwaggerDocumentEditor />
            )}
            {activeTab === TAB_EDITOR_SETTINGS_ID && (
                <EditorSettings />
            )}
            {activeTab === TAB_GENERATOR_SETTINGS_ID && (
                <GeneratorSettings />
            )}
            {/* TODO add popover as a hint */}
            {activeTab === TAB_LOAD_DOCUMENT_ID && (
                <LoadDocumentForm />
            )}
        </Card>
    );
};
