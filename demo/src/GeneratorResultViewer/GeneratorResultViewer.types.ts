import {PropsWithChildren} from 'react';
import {ClassNameProps} from '../../@types/className';

export type GeneratorResultViewerProps = PropsWithChildren<{
    value: string;
}> & ClassNameProps;
