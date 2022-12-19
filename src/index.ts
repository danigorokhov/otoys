import { Config } from './Config';
import { Registry } from './Registry';
import { DocumentHandler } from './DocumentHandler';
import { Generator } from './Generator';

export const main = async (userConfig: object) => {
    const config = new Config(userConfig);
    const registry = new Registry({ config });

    const documentHandler = new DocumentHandler(registry);
    const document = await documentHandler.load();

    const generator = new Generator(registry, document);
    await generator.generateSchemas();
};
