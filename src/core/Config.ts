import { DocumentType } from './types/document';

type DocumentRemote = {
    type: 'remote';
    url: string;
};
type DocumentLocal = {
    type: 'local';
    path: string;
};
type DocumentInline = {
    type: 'inline';
    content: string;
    documentType: DocumentType;
};

type DocumentLoader =
    | DocumentRemote
    | DocumentLocal
    | DocumentInline
;

type OutputLocal = {
    type: 'Local',
    path: string;
};
type OutputInline = {
    type: 'Inline',
};

type Output =
    | OutputLocal
    | OutputInline
;

export type ConfigOptions = {
    documentLoader: DocumentLoader;
    output: Output;
    pathWhitelist?: string;
};

export class Config {
    public documentLoader: DocumentLoader;
    public output: Output;
    public pathWhitelist?: string;

    constructor(configOptions: ConfigOptions) {
        this.documentLoader = configOptions.documentLoader;
        this.output = configOptions.output;
        this.pathWhitelist = configOptions.pathWhitelist;
    }
}
