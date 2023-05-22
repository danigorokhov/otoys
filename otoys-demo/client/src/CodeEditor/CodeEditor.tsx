import React, {FC} from 'react';
import { CodeEditorProps } from './CodeEditor.types';
import {cn} from './CodeEditor.cn';
import { useTheme } from '../ThemeProvider';
import { MONACO_EDITOR_THEME_DARK, MONACO_EDITOR_THEME_LIGHT } from './CodeEditor.const';
import MonacoEditor from '@monaco-editor/react';
import {Loader} from '@gravity-ui/uikit';
import './CodeEditor.css';

export const CodeEditor: FC<CodeEditorProps> = props => {
    const {
        language,
        defaultValue,
        value,
        path,
        options,
        onChange,
        className,
    } = props;

    const { theme } = useTheme();
    const editorTheme = theme === 'dark' ? MONACO_EDITOR_THEME_DARK : MONACO_EDITOR_THEME_LIGHT;

    return (
        <MonacoEditor
            className={cn(null, [className])}
            theme={editorTheme}
            loading={<Loader size="m" />}
            language={language}

            options={options}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            path={path}
        />
    );
};
