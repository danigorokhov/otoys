import {PropsWithChildren} from 'react';
import {ClassNameProps} from '../../@types/className';

export type LoadDocumentFormProps = PropsWithChildren<{}> & ClassNameProps;

export type LoadDocumentFormValues = {
    documentType: 'remote' | 'file';
    url?: string;
    file?: File;
};

export type HandleSubmit = (values: LoadDocumentFormValues) => void;
