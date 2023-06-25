import React, { FC } from 'react';
import {fork} from 'effector';
import {Provider as ScopeProvider} from 'effector-react';
import {ThemeProvider} from '../ThemeProvider';
import { App } from './App';

const scopeRoot = fork();

export const AppContainer: FC = () => {
    return (
        <ScopeProvider value={scopeRoot}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </ScopeProvider>
    );
};
