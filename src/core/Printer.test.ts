import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { beforeEach, expect, describe, jest, it } from '@jest/globals';

import { nodesMock, typesMock } from './__mocks__/ast';
import { Printer } from './Printer';
import { Registry } from './Registry';
import { Config } from './Config';

jest.mock('fs/promises');
const mkdirMock = mkdir as jest.Mocked<typeof mkdir>;
const writeFileMock = writeFile as jest.Mocked<typeof writeFile>;

jest.mock('path');
const resolveMock = resolve as jest.Mocked<typeof resolve>;

describe('Printer', () => {
    let registry: Registry;

    beforeEach(() => {
        jest.clearAllMocks();

        registry = new Registry({
            config: new Config({
                output: 'src/types',
                document: { type: 'local', path: '' },
            }),
        });
    });

    describe('resolveOutputDir', () => {
        it('should resolve path to output directory', () => {
            jest.spyOn(process, 'cwd').mockReturnValue('/cwd');

            resolveMock.mockImplementationOnce((...paths) => paths.join('/'));

            const printer = new Printer(registry);
            const receivedPath = printer.resolveOutputDir();

            expect(resolveMock).toBeCalledTimes(1);
            expect(resolveMock).toHaveBeenCalledWith('/cwd', 'src/types');

            expect(receivedPath).toStrictEqual('/cwd/src/types');
        });
    });

    describe('print', () => {
        it('should resolve path to schema file output', async() => {
            const printer = new Printer(registry);

            jest.spyOn(printer, 'resolveOutputDir').mockReturnValue('/cwd/src/types');

            await printer.print(nodesMock);

            expect(resolveMock).toBeCalledTimes(1);
            expect(resolveMock).toHaveBeenCalledWith('/cwd/src/types', 'index.ts');
        });

        it('should create directory to schema output', async() => {
            const printer = new Printer(registry);

            jest.spyOn(printer, 'resolveOutputDir').mockReturnValue('/cwd/src/types');

            await printer.print(nodesMock);

            expect(mkdirMock).toBeCalledTimes(1);
            expect(mkdirMock).toHaveBeenCalledWith('/cwd/src/types', { recursive: true });
        });

        it('should print schema in file', async() => {
            const printer = new Printer(registry);

            resolveMock.mockReturnValue('/cwd/src/types/index.ts');

            await printer.print(nodesMock);

            expect(writeFileMock).toBeCalledTimes(1);
            expect(writeFileMock).toHaveBeenCalledWith('/cwd/src/types/index.ts', typesMock);
        });
    });
});
