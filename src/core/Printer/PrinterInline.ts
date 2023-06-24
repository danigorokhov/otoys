import { NodeArray, Node } from 'typescript';

import { PrinterBase } from './PrinterBase';

export class PrinterInline extends PrinterBase {
    public async print(nodes: NodeArray<Node>): Promise<string> {
        const sourceFile = PrinterInline.createSourceFile();

        return PrinterInline.printAST(
            nodes,
            sourceFile,
        );
    }
}
