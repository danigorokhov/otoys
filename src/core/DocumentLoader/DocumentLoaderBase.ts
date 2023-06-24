import { OpenAPIObject } from 'openapi3-ts/oas30';
import YAML from 'yaml';

// Local type for loading
export type DocumentType = 'yaml' | 'json';

export abstract class DocumentLoaderBase {
    static validate(document: unknown) {
        if (
            typeof document === 'object' && document !== null &&
            'openapi' in document && typeof document.openapi === 'string' &&
            document.openapi.startsWith('3.0')
        ) {
            // TODO support validation
            return document as OpenAPIObject;
        }

        throw new Error(
            'DocumentLoaderBase: document validation failed. Supported only OpenAPI v3.0',
        );
    }

    static parse(document: string, type: DocumentType) {
        let documentParsed: unknown;

        // Uses parser by document type
        switch (type) {
            case 'yaml': {
                documentParsed = YAML.parse(document);
                break;
            } case 'json': {
                documentParsed = JSON.parse(document);
                break;
            } default: {
                throw new Error(
                    `DocumentLoaderError: unknown document type "${type}"`
                );
            }
        }

        return documentParsed;
    }

    public abstract load(): Promise<OpenAPIObject>;
}
