import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { beforeEach, expect, describe, jest, it } from '@jest/globals';
import {
    createSourceFile,
    factory,
    ScriptTarget,
} from 'typescript';

import { PrinterLocal } from './PrinterLocal';

jest.mock('fs/promises');
const mkdirMock = mkdir as jest.Mocked<typeof mkdir>;
const writeFileMock = writeFile as jest.Mocked<typeof writeFile>;

jest.mock('path');
const resolveMock = resolve as jest.Mocked<typeof resolve>;

describe('Printer/PrinterLocal', () => {
    const createSourceFileMock = jest.spyOn(PrinterLocal, 'createSourceFile').mockReturnValue(
        createSourceFile('', '', ScriptTarget.ESNext),
    );
    const printASTMock = jest.spyOn(PrinterLocal, 'printAST').mockReturnValue('');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('resolveOutputDir', () => {
        it('should resolve path to output directory', () => {
            jest.spyOn(process, 'cwd').mockReturnValue('/cwd');

            resolveMock.mockImplementationOnce((...paths) => paths.join('/'));

            const printer = new PrinterLocal('src/types');
            const receivedPath = printer.resolveOutputDir();

            expect(resolveMock).toBeCalledTimes(1);
            expect(resolveMock).toBeCalledWith('/cwd', 'src/types');

            expect(receivedPath).toStrictEqual('/cwd/src/types');
        });
    });

    describe('print', () => {
        it('should resolve path to schema file output', async() => {
            const printer = new PrinterLocal('src/types');
            jest.spyOn(printer, 'resolveOutputDir').mockReturnValue('/cwd/src/types');

            await printer.print(factory.createNodeArray());

            expect(resolveMock).toBeCalledTimes(1);
            expect(resolveMock).toBeCalledWith('/cwd/src/types', 'index.ts');
        });

        it('should create directory to schema output', async() => {
            const printer = new PrinterLocal('src/types');
            jest.spyOn(printer, 'resolveOutputDir').mockReturnValue('/cwd/src/types');

            await printer.print(factory.createNodeArray());

            expect(mkdirMock).toBeCalledTimes(1);
            expect(mkdirMock).toBeCalledWith('/cwd/src/types', { recursive: true });
        });

        it('should create TypeScript source file with index.ts filename', async () => {
            const printer = new PrinterLocal('src/types');
            await printer.print(factory.createNodeArray());

            expect(createSourceFileMock).toBeCalledTimes(1);
            expect(createSourceFileMock).toBeCalledWith('index.ts');
        });

        it('should use printAST to print TypeScript nodes', async () => {
            const nodes = factory.createNodeArray();
            const sourceFile = createSourceFile('', '', ScriptTarget.ESNext);

            createSourceFileMock.mockReturnValueOnce(sourceFile);

            const printer = new PrinterLocal('src/types');
            await printer.print(nodes);

            expect(printASTMock).toBeCalledTimes(1);
            expect(printASTMock).toBeCalledWith(nodes, sourceFile);
        });

        it('should write printed TypeScript nodes in file', async() => {
            resolveMock.mockReturnValue('/cwd/src/types/index.ts');
            printASTMock.mockReturnValueOnce("type Printed = 'nodes';");

            const printer = new PrinterLocal('src/types');
            await printer.print(factory.createNodeArray());

            expect(writeFileMock).toBeCalledTimes(1);
            expect(writeFileMock).toBeCalledWith('/cwd/src/types/index.ts', "type Printed = 'nodes';");
        });
    });
});
