import { Node, NodeArray } from 'typescript';

import {
    PrinterBase,
    PrinterLocal,
    PrinterInline,
} from './Printer';
import { Registry } from './Registry';

export class PrinterHandler {
    constructor(private registry: Registry) {}

    public async print(nodes: NodeArray<Node>): Promise<string> {
        const { output } = this.registry.config;

        let printer: PrinterBase;
        switch (output.type) {
            case 'local':
                printer = new PrinterLocal(output.path);
                break;
            case 'inline':
                printer = new PrinterInline();
                break;
        }

        return await printer.print(nodes);
    }
}
