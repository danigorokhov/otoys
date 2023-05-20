import React, {FC, useEffect} from 'react';
import {useUnit} from 'effector-react';
import { GeneratorResultProps } from './GeneratorResult.types';
import {cn} from './GeneratorResult.cn';
import './GeneratorResult.css';
import { Card } from '@gravity-ui/uikit';
import {GeneratorResultControls} from '../GeneratorResultControls';
import {GeneratorResultViewer} from '../GeneratorResultViewer';
import {$generatorResult, generatorResultInitialized, generatorResultChanged, $isGeneratorResultInitialized} from './GeneratorResult.models';

import './GeneratorResult.models/init';

// TODO generate from swagger document
export const GENERATOR_RESULT_DEFAULT_VALUE = `export type Tag = {
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

export const GeneratorResult: FC<GeneratorResultProps> = props => {
    const {
        className,
    } = props;

    const [
        generatorResult,
        setGeneratorResult,
    ] = useUnit([$generatorResult, generatorResultChanged]);

    const [
        isGeneratorResultInitialized,
        setGeneratorResultInitialized,
    ] = useUnit([$isGeneratorResultInitialized, generatorResultInitialized]);

    useEffect(() => {
        if (isGeneratorResultInitialized) return;

        setGeneratorResult(GENERATOR_RESULT_DEFAULT_VALUE);
        setGeneratorResultInitialized(true);
    }, [isGeneratorResultInitialized, setGeneratorResult, setGeneratorResultInitialized]);

    return (
        <Card className={cn(null, [className])}>
            <GeneratorResultControls />
            <GeneratorResultViewer value={generatorResult} />
        </Card>
    );
};
