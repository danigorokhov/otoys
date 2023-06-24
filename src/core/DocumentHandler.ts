import {
    DocumentLoaderBase,
    DocumentLoaderLocal,
    DocumentLoaderRemote,
    DocumentLoaderInline,
} from './DocumentLoader';
import { Registry } from './Registry';

export class DocumentHandler {
    constructor(private registry: Registry) {}

    public async load() {
        const { documentLoader: documentLoaderConfig } = this.registry.config;

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
            case 'inline':
                documentLoader = new DocumentLoaderInline({
                    content: documentLoaderConfig.content,
                    documentType: documentLoaderConfig.documentType,
                });
                break;
        }

        const document = await documentLoader.load();

        return document;
    }
}
