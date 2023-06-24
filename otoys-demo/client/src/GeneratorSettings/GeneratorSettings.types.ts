import {PropsWithChildren} from 'react';
import {ClassNameProps} from '../../@types/className';
import {WatchObserver} from 'react-hook-form';
import {GeneratorSettings} from '../../@types/generator';

export type GeneratorSettingsProps = PropsWithChildren<{}> & ClassNameProps;

export type GeneratorSettingsValues = GeneratorSettings;

export type HandleChange = WatchObserver<GeneratorSettingsValues>;
