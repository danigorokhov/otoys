import got from 'got';

import { DocumentLoaderBase } from './DocumentLoaderBase';

type DocumentLoaderRemoteOptions = {
    url: string;
};

export class DocumentLoaderRemote extends DocumentLoaderBase {
    private url: string;

    constructor(options: DocumentLoaderRemoteOptions) {
        super();

        this.url = options.url;
    }

    public async load() {
        // Got supports only json
        const documentFetched = await got(this.url).json();

        // Uses base document validation
        const documentValidated = DocumentLoaderRemote.validate(documentFetched);

        return documentValidated;
    }
}
