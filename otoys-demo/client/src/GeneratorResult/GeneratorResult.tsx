import React, {FC} from 'react';
import {useUnit} from 'effector-react';
import { GeneratorResultProps } from './GeneratorResult.types';
import {cn} from './GeneratorResult.cn';
import './GeneratorResult.css';
import { Card } from '@gravity-ui/uikit';
import {GeneratorResultControls} from '../GeneratorResultControls';
import {GeneratorResultViewer} from '../GeneratorResultViewer';
import {$generatorResult, $generatorResultStatus} from './GeneratorResult.models';

import './GeneratorResult.models/init';

export const GeneratorResult: FC<GeneratorResultProps> = props => {
    const {
        className,
    } = props;

    const [
        generatorResult,
    ] = useUnit([$generatorResult]);

    const [
        generatorResultStatus,
    ] = useUnit([$generatorResultStatus]);

    return (
        <Card className={cn(null, [className])}>
            <GeneratorResultControls
                textToCopy={generatorResult}
            />
            <GeneratorResultViewer
                isLoading={generatorResultStatus === 'pending'}
                value={generatorResult}
            />
        </Card>
    );
};
