import {ComponentProps, PropsWithChildren} from 'react';
import {ClassNameProps} from '../../@types/className';
import {CodeEditor} from '../CodeEditor';

export type SwaggerDocumentEditorProps = PropsWithChildren<{}> & ClassNameProps;

type CodeEditorProps = ComponentProps<typeof CodeEditor>;
export type HandleChange = Required<CodeEditorProps>['onChange'];

export type EditorLang = 'json' | 'yaml';
