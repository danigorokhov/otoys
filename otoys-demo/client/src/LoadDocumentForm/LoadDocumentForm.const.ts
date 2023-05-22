import { ControlGroupOption } from '@gravity-ui/uikit';
import { LoadDocumentFormValues} from './LoadDocumentForm.types';

export const DOCUMENT_TYPE_REMOTE = 'remote';
export const DOCUMENT_TYPE_FILE = 'file';
export const DOCUMENT_TYPE_OPTIONS: ControlGroupOption[] = [
    {
        content: 'Удалённый',
        // content: 'Remote',
        value: DOCUMENT_TYPE_REMOTE,
    },
    {
        content: 'Файлом',
        // content: 'File',
        value: DOCUMENT_TYPE_FILE,
    },
];

export const LOAD_DOCUMENT_FORM_DEFAULT_VALUES: Partial<LoadDocumentFormValues> = {
    documentType: 'file',
};
