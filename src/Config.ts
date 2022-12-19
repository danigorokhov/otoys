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

type UserConfig = {
    document: Document;
    output: string;
    pathWhitelist?: Path[];
};

export class Config {
    static validate(userConfig: unknown): boolean {
        let isValid = true;
        // TODO ajv with json-schema here
        if (
            typeof userConfig !== 'object' || userConfig === null
            || !('document' in userConfig)
            || !('output' in userConfig)
            || 'pathWhitelist' in userConfig && !Array.isArray(userConfig.pathWhitelist)
        ) {
            isValid = false;
        }

        return isValid;
    }

    public document: Document;
    public output: string;
    public pathWhitelist?: Path[];

    constructor(userConfig: unknown) {
        const userConfigParsed = this.parse(userConfig);

        this.document = userConfigParsed.document;
        this.output = userConfigParsed.output;
        this.pathWhitelist = userConfigParsed.pathWhitelist;
    }

    private parse(userConfig: unknown): UserConfig {
        const isValid = Config.validate(userConfig)

        if (!isValid) {
            // TODO throw particular error
            throw new Error('Invalid config');
        }
        // TODO pick particular fields from userConfig
        return userConfig as UserConfig;
    }
}
