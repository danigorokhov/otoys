import React, { FC } from 'react';
import {fork} from 'effector';
import {Provider as ScopeProvider} from 'effector-react';
import {cn} from './App.cn';
import {ThemeProvider} from '../ThemeProvider';
import {Header} from '../Header';
import {Playground} from '../Playground';
import './App.css';
import '../utils/i18n/i18n.models/init';

const scopeRoot = fork();

export const App: FC = () => {
    return (
        <ScopeProvider value={scopeRoot}>
            <ThemeProvider>
                <div className={cn()}>
                    <Header />
                    <Playground />
                    {/*
                    <FeedbackControl />
                    */}
                </div>
            </ThemeProvider>
        </ScopeProvider>
    );
};
