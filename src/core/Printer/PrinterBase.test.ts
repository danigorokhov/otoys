import { expect, describe, it } from '@jest/globals';
import {
    createSourceFile,
    ScriptKind,
    ScriptTarget,
} from 'typescript';

import { PrinterBase } from './PrinterBase';
import { nodesMock, nodesPrintedMock } from './__mocks__/ast';

class TestPrinterBase extends PrinterBase {
    public async print() {
        return '';
    }
}

describe('Printer/PrinterBase', () => {
    it('should provide print method to derived class', () => {
        const printer = new TestPrinterBase();

        expect(printer.print).toBeDefined();
    });

    describe('createSourceFile', () => {
        it('should create TypeScript source file', () => {
            expect(PrinterBase.createSourceFile('fileName')).toMatchSnapshot();
        });
    });

    describe('printAST', () => {
        it('should print AST', () => {
            const sourceFile = createSourceFile('', '', ScriptTarget.ESNext, undefined, ScriptKind.TS);

            expect(PrinterBase.printAST(nodesMock, sourceFile)).toBe(nodesPrintedMock);
        });
    });
});
