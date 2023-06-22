import {
    DocumentLoaderBase,
    DocumentLoaderLocal,
    DocumentLoaderRemote,
} from './DocumentLoader';
import { Registry } from './Registry';

export class DocumentHandler {
    constructor(private registry: Registry) {}

    public async load() {
        const { config } = this.registry;

        // Initializes document loader by type
        let documentLoader: DocumentLoaderBase;
        if (config.document.type === 'local') {
            documentLoader = new DocumentLoaderLocal({
                path: config.document.path,
            });
        } else {
            documentLoader = new DocumentLoaderRemote({
                url: config.document.url,
            });
        }

        const document = await documentLoader.load();

        return document;
    }
}
