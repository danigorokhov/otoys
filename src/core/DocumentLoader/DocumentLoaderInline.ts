import { DocumentType } from '../types/document';
import { DocumentLoaderBase } from './DocumentLoaderBase';

type DocumentLoaderInlineOptions = {
    content: string;
    documentType: DocumentType;
};

export class DocumentLoaderInline extends DocumentLoaderBase {
    constructor(private options: DocumentLoaderInlineOptions) {
        super();
    }

    public async load() {
        const {
            content,
            documentType,
        } = this.options;

        const documentParsed = DocumentLoaderInline.parse(content, documentType);
        const documentValidated = DocumentLoaderInline.validate(documentParsed);

        return documentValidated;
    }
}
