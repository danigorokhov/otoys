import React, { FC } from 'react';
import {cn} from './App.cn';
import {ThemeProvider} from '../ThemeProvider';
import {I18nProvider} from '../I18nProvider';
import {Header} from '../Header';
import {Playground} from '../Playground';
import './App.css';

export const App: FC = () => {
    return (
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
    );
};
