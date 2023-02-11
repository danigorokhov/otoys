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

    async load() {
        const documentFetched = await got(this.url).json();

        const documentValidated = this.validate(documentFetched);

        return documentValidated;
    }
}
