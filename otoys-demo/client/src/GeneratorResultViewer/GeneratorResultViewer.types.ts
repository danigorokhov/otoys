import {PropsWithChildren} from 'react';
import {ClassNameProps} from '../../@types/className';

export type GeneratorResultViewerProps = PropsWithChildren<{
    isLoading: boolean;
    value: string;
}> & ClassNameProps;
