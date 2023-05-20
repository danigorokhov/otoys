import {PropsWithChildren} from 'react';
import {ClassNameProps} from '../../@types/className';

export type GeneratorResultControlsProps = PropsWithChildren<{
    textToCopy: string;
}> & ClassNameProps;
