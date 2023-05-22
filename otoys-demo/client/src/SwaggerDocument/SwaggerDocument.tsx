import React, {FC, useCallback, useState} from 'react';
import { SwaggerDocumentProps, HandleSelectTab } from './SwaggerDocument.types';
import {cn} from './SwaggerDocument.cn';
import './SwaggerDocument.css';
import { Card, Tabs } from '@gravity-ui/uikit';
import {TABS, TAB_EDITOR_ID, TAB_GENERATOR_SETTINGS_ID, TAB_EDITOR_SETTINGS_ID, TAB_LOAD_DOCUMENT_ID} from './SwaggerDocument.const';
import {SwaggerDocumentEditor} from '../SwaggerDocumentEditor';
import {GeneratorSettings} from '../GeneratorSettings';
import {EditorSettings} from '../EditorSettings';
import {LoadDocumentForm} from '../LoadDocumentForm';

export const SwaggerDocument: FC<SwaggerDocumentProps> = props => {
    const {
        className,
    } = props;

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
                items={TABS}
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
