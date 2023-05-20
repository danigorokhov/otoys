import {ComponentProps, PropsWithChildren} from 'react';
import {ClassNameProps} from '../../@types/className';
import MonacoEditor from '@monaco-editor/react';

type MonacoEditorProps = ComponentProps<typeof MonacoEditor>;
type MonacoEditorSupportedProps = Pick<MonacoEditorProps, 'options' | 'defaultValue' | 'value' | 'onChange' | 'path'>;

export type CodeEditorProps = PropsWithChildren<{
    language: 'json' | 'yaml' | 'typescript',
}> & ClassNameProps & MonacoEditorSupportedProps;
