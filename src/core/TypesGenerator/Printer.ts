import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import {
    ListFormat,
    NodeArray,
    ScriptKind,
    ScriptTarget,
    TypeAliasDeclaration,
    createSourceFile,
    createPrinter,
} from 'typescript';

import { Config } from '../Config';

export class Printer {
    private fileName = 'index.ts';

    constructor(private output: Config['output']) {}

    public resolveOutputDir(): string {
        return resolve(process.cwd(), this.output);
    }

    public async print(nodes: NodeArray<TypeAliasDeclaration>) {
        const outputDir = this.resolveOutputDir();

        await mkdir(outputDir, { recursive: true });

        const filePath = resolve(outputDir, this.fileName);

        const sourceFile = createSourceFile(
            this.fileName,
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
