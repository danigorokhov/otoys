import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import {
    ListFormat,
    NodeArray,
    ScriptKind,
    ScriptTarget,
    Node,
    createSourceFile,
    createPrinter,
} from 'typescript';

import { Config } from './Config';
import { Registry } from './Registry';

// TODO option to get result as a string
export class Printer {
    private fileName = 'index.ts';
    private config: Config;

    constructor(registry: Registry) {
        this.config = registry.config;
    }

    public resolveOutputDir(): string {
        return resolve(process.cwd(), this.config.output);
    }

    public async print(nodes: NodeArray<Node>) {
        const outputDir = this.resolveOutputDir();

        await mkdir(outputDir, { recursive: true });

        const filePath = resolve(outputDir, this.fileName);

        const sourceFile = createSourceFile(
            this.fileName,
            // Default text in file
            '',
            ScriptTarget.ESNext, // TODO setup via config
            true, // TODO investigate what is it
            ScriptKind.TS,
        );

        const printer = createPrinter();

        const fileContent = printer.printList(
            ListFormat.MultiLine, // TODO setup via config
            nodes,
            sourceFile,
        );

        await writeFile(filePath, fileContent);
    }
}
