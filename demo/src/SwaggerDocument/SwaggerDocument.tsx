import React, {FC, useCallback, useState} from 'react';
import { SwaggerDocumentProps, HandleSelectTab } from './SwaggerDocument.types';
import {cn} from './SwaggerDocument.cn';
import './SwaggerDocument.css';
import { Card, Tabs } from '@gravity-ui/uikit';
import {TABS, TAB_EDITOR_ID, TAB_SETTINGS_ID} from './SwaggerDocument.const';
import {SwaggerDocumentEditor} from '../SwaggerDocumentEditor';

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
            {activeTab === TAB_SETTINGS_ID && (
                null
                // <GeneratorSettings />
            )}
        </Card>
    );
};
