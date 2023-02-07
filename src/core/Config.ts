type DocumentRemote = {
    type: 'remote';
    url: string;
};
type DocumentLocal = {
    type: 'local';
    path: string;
};

type Document = DocumentRemote | DocumentLocal;

export type ConfigOptions = {
    document: Document;
    output: string;
    pathWhitelist?: string;
};

export class Config {
    public document: Document;
    public output: string;
    public pathWhitelist?: string;

    constructor(configOptions: ConfigOptions) {
        this.document = configOptions.document;
        this.output = configOptions.output;
        this.pathWhitelist = configOptions.pathWhitelist;
    }
}
