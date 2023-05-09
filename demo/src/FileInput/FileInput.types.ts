import {FocusEventHandler, PropsWithChildren, RefObject} from 'react';
import {ClassNameProps} from '../../@types/className';

export type FileInputProps = PropsWithChildren<{
    name?: string;
    onChange?: (files: File) => void;
    value?: File;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    inputRef?: RefObject<HTMLInputElement>;
    accept?: string;
}> & ClassNameProps;
