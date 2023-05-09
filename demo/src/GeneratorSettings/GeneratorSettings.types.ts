import {PropsWithChildren} from 'react';
import {ClassNameProps} from '../../@types/className';
import {WatchObserver} from 'react-hook-form';

export type GeneratorSettingsProps = PropsWithChildren<{}> & ClassNameProps;

export type GeneratorSettingsValues = {
    pathWhitelist?: string;
};

export type HandleChange = WatchObserver<GeneratorSettingsValues>;
