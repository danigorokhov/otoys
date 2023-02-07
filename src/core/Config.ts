type Path = {
    regExp: string;
};

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
    pathWhitelist?: Path[];
};

export class Config {
    public document: Document;
    public output: string;
    public pathWhitelist?: Path[];

    constructor(configOptions: ConfigOptions) {
        this.document = configOptions.document;
        this.output = configOptions.output;
        this.pathWhitelist = configOptions.pathWhitelist;
    }
}
