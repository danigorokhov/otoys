import { Config } from './Config';
import { Registry } from './Registry';
import { DocumentHandler } from './DocumentHandler';
import { TypesGeneratorHandler } from './TypesGeneratorHandler';
import { PrinterHandler } from './PrinterHandler';

type Generate = (config: Config) => Promise<string>;

export const generate: Generate = async config => {
    // TODO to pure config without Registry
    const registry = new Registry({ config });

    const documentHandler = new DocumentHandler(registry);
    const document = await documentHandler.load();

    const generator = new TypesGeneratorHandler(registry, document);
    const ast = generator.generate();

    const printer = new PrinterHandler(registry);
    return await printer.print(ast);
};
