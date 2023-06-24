import { Config } from './Config';
import { Registry } from './Registry';
import { DocumentHandler } from './DocumentHandler';
import { TypesGeneratorHandler } from './TypesGeneratorHandler';

type Generate = (config: Config) => void;

export const generate: Generate = async config => {
    // TODO to pure config without Registry
    const registry = new Registry({ config });

    const documentHandler = new DocumentHandler(registry);
    const document = await documentHandler.load();

    const generator = new TypesGeneratorHandler(registry, document);
    const _ast = generator.generate();
};
