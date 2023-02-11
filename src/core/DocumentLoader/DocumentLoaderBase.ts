import { OpenAPIObject } from 'openapi3-ts';
import YAML from 'yaml';

export type DocumentType = 'yaml' | 'json';

export abstract class DocumentLoaderBase {
    protected validate(document: unknown) {
        // TODO support validation
        return document as OpenAPIObject;
    }

    protected parse(document: string, type: DocumentType) {
        let documentParsed: unknown;

        switch (type) {
            case 'yaml': {
                documentParsed = YAML.parse(document);
                break;
            } case 'json': {
                documentParsed = JSON.parse(document);
                break;
            } default: {
                throw new Error(`DocumentLoader: unknown document type "${type}"`);
            }
        }

        return documentParsed;
    }

    public abstract load(): Promise<OpenAPIObject>;
}
