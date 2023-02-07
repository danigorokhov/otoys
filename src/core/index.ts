import { Config } from './Config';
import { Registry } from './Registry';
import { DocumentHandler } from '../DocumentHandler';
import { Generator } from '../Generator';

type Generate = (config: Config) => void;

export const generate: Generate = async config => {
    const registry = new Registry({ config });

    const documentHandler = new DocumentHandler(registry);
    const document = await documentHandler.load();

    const generator = new Generator(registry, document);
    await generator.generateSchemas();
};
