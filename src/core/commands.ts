import { Config } from './Config';
import { Registry } from './Registry';
import { DocumentHandler } from './DocumentHandler';
import { TypesGeneratorHandler } from './TypesGeneratorHandler';
import { Printer } from './Printer';

type Generate = (config: Config) => void;

export const generate: Generate = async config => {
    // TODO to pure config without Registry
    const registry = new Registry({ config });

    const documentHandler = new DocumentHandler(registry);
    const document = await documentHandler.load();

    const generator = new TypesGeneratorHandler(registry, document);
    const ast = generator.generate();

    const printer = new Printer(registry);
    await printer.print(ast);
};
