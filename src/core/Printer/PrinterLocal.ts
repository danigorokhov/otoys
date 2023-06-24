import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { NodeArray, Node } from 'typescript';

import { PrinterBase } from './PrinterBase';

export class PrinterLocal extends PrinterBase {
    private fileName = 'index.ts';

    constructor(private output: string) {
        super();
    }

    public resolveOutputDir(): string {
        return resolve(process.cwd(), this.output);
    }

    public async print(nodes: NodeArray<Node>) {
        const outputDir = this.resolveOutputDir();
        await mkdir(outputDir, { recursive: true });

        const filePath = resolve(outputDir, this.fileName);

        const sourceFile = PrinterLocal.createSourceFile(this.fileName);
        const fileContent = PrinterLocal.printAST(nodes, sourceFile);

        await writeFile(filePath, fileContent);

        return fileContent;
    }
}
