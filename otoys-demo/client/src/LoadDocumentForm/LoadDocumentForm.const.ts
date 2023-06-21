import { LoadDocumentFormValues} from './LoadDocumentForm.types';

export const DOCUMENT_TYPE_REMOTE = 'remote';
export const DOCUMENT_TYPE_FILE = 'file';

export const LOAD_DOCUMENT_FORM_DEFAULT_VALUES: Partial<LoadDocumentFormValues> = {
    documentType: 'file',
};
