import React, { FC } from 'react';
import {fork} from 'effector';
import {Provider as ScopeProvider} from 'effector-react';
import {cn} from './App.cn';
import {ThemeProvider} from '../ThemeProvider';
import {I18nProvider} from '../I18nProvider';
import {Header} from '../Header';
import {Playground} from '../Playground';
import './App.css';

const scopeRoot = fork();

export const App: FC = () => {
    return (
        <ScopeProvider value={scopeRoot}>
            <I18nProvider>
                <ThemeProvider>
                    <div className={cn()}>
                        <Header />
                        <Playground />
                        {/*
                        <FeedbackControl />
                        */}
                    </div>
                </ThemeProvider>
            </I18nProvider>
        </ScopeProvider>
    );
};
