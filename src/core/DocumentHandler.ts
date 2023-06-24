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
        const { documentLoader: documentLoaderConfig } = config;

        // Initializes document loader by type
        let documentLoader: DocumentLoaderBase;

        switch (documentLoaderConfig.type) {
            case 'local':
                documentLoader = new DocumentLoaderLocal({
                    path: documentLoaderConfig.path,
                });
                break;
            case 'remote':
                documentLoader = new DocumentLoaderRemote({
                    url: documentLoaderConfig.url,
                });
                break;
        }

        const document = await documentLoader.load();

        return document;
    }
}
