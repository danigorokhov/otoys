import { expect, describe, it } from '@jest/globals';
import {
    createSourceFile,
    factory,
    ScriptTarget,
} from 'typescript';

import { PrinterInline } from './PrinterInline';

describe('Printer/PrinterInline', () => {
    const createSourceFileMock = jest.spyOn(PrinterInline, 'createSourceFile').mockReturnValue(
        createSourceFile('', '', ScriptTarget.ESNext),
    );
    const printASTMock = jest.spyOn(PrinterInline, 'printAST').mockReturnValue('');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('print', () => {
        it('should create TypeScript source file without filename', async () => {
            const printer = new PrinterInline();
            await printer.print(factory.createNodeArray());

            expect(createSourceFileMock).toBeCalledTimes(1);
            expect(createSourceFileMock).toBeCalledWith();
        });

        it('should use printAST to print TypeScript nodes', async () => {
            const nodes = factory.createNodeArray();
            const sourceFile = createSourceFile('', '', ScriptTarget.ESNext);

            createSourceFileMock.mockReturnValueOnce(sourceFile);

            const printer = new PrinterInline();
            await printer.print(nodes);

            expect(printASTMock).toBeCalledTimes(1);
            expect(printASTMock).toBeCalledWith(nodes, sourceFile);
        });

        it('should return printed TypeScript nodes', async () => {
            printASTMock.mockReturnValueOnce("type Printed = 'nodes';")

            const printer = new PrinterInline();
            const nodesPrinted = await printer.print(factory.createNodeArray());

            expect(nodesPrinted).toBe("type Printed = 'nodes';");
        });
    });
});
