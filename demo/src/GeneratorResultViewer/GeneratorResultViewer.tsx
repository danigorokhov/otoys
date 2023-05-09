import React, {FC} from 'react';
import { GeneratorResultViewerProps } from './GeneratorResultViewer.types';
import {cn} from './GeneratorResultViewer.cn';
import './GeneratorResultViewer.css';
import { CodeEditor } from '../CodeEditor';

// TODO generate from swagger document
export const DEFAULT_VALUE = `export type Tag = {
    id: number;
    name: string;
};

export type Category = {
    id: number;
    name: string;
};

export type Pet = {
    category: Category;
    photoUrls: string[];
    tags: Tag[];
};
`;

export const GeneratorResultViewer: FC<GeneratorResultViewerProps> = props => {
    const {
        className,
    } = props;

    return (
        <CodeEditor
            className={cn(null, [className])}
            language="typescript"
            defaultValue={DEFAULT_VALUE}
            path="generatorResult.ts"
        />
    );
};
