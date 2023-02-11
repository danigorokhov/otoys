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

    async load() {
        const pathResolved = resolve(process.cwd(), this.path);

        let documentType: DocumentType;
        const documentExtension = extname(pathResolved);

        if (documentExtension === '.json') {
            documentType = 'json';
        } else if (documentExtension === '.yaml' || documentExtension === '.yml') {
            documentType = 'yaml';
        } else {
            throw new Error(`DocumentLoader: document cannot be parsed, unsupported file extension ${documentExtension}`);
        }

        const documentRaw = await readFile(pathResolved, { encoding: 'utf8' });

        const documentParsed = this.parse(documentRaw, documentType);
        const documentValidated = this.validate(documentParsed);

        return documentValidated;
    }
}
