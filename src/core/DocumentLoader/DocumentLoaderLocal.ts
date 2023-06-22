import { readFile } from 'fs/promises';
import { resolve, extname } from 'path';

import { DocumentLoaderBase, DocumentType } from './DocumentLoaderBase';

type DocumentLoaderLocalOptions = {
    path: string;
};

export class DocumentLoaderLocal extends DocumentLoaderBase {
    private path: string;

    constructor(options: DocumentLoaderLocalOptions) {
        super();

        this.path = options.path;
    }

    public async load() {
        const pathResolved = resolve(process.cwd(), this.path);

        // Uses extension name to define document type
        let documentType: DocumentType;
        const documentExtension = extname(pathResolved);
        if (documentExtension === '.json') {
            documentType = 'json';
        } else if (documentExtension === '.yaml' || documentExtension === '.yml') {
            documentType = 'yaml';
        } else {
            throw new Error(
                `DocumentLoaderError: document cannot be parsed, unsupported file extension ${documentExtension}`
            );
        }

        const documentRaw = await readFile(pathResolved, { encoding: 'utf8' });
        const documentParsed = DocumentLoaderLocal.parse(documentRaw, documentType);
        // Uses base document validation
        const documentValidated = DocumentLoaderLocal.validate(documentParsed);

        return documentValidated;
    }
}
