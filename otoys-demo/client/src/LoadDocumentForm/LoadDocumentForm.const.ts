import { ControlGroupOption } from '@gravity-ui/uikit';
import { LoadDocumentFormValues} from './LoadDocumentForm.types';
import { i18n } from './LoadDocumentForm.i18n';

export const DOCUMENT_TYPE_REMOTE = 'remote';
export const DOCUMENT_TYPE_FILE = 'file';
export const DOCUMENT_TYPE_OPTIONS: ControlGroupOption[] = [
    {
        content: i18n('field.documentType.option.remote'),
        value: DOCUMENT_TYPE_REMOTE,
    },
    {
        content: i18n('field.documentType.option.file'),
        value: DOCUMENT_TYPE_FILE,
    },
];

export const LOAD_DOCUMENT_FORM_DEFAULT_VALUES: Partial<LoadDocumentFormValues> = {
    documentType: 'file',
};
