import { expect, jest, describe, it } from '@jest/globals';
import { readFile } from 'fs/promises';
import { resolve, extname } from 'path';

import { DocumentLoaderLocal } from './DocumentLoaderLocal';

jest.mock('fs/promises');
const readFileMock = readFile as jest.Mocked<typeof readFile>;
readFileMock.mockResolvedValueOnce('document');

jest.mock('path');
const resolveMock = resolve as jest.Mocked<typeof resolve>;
resolveMock.mockReturnValue('/path');

const extnameMock = extname as jest.Mocked<typeof extname>;
extnameMock.mockReturnValue('.json');

describe('DocumentLoader -> DocumentLoaderLocal', () => {
    const cwdMock = jest.spyOn(process, 'cwd').mockReturnValue('/cwd');
    const parseMock = jest.spyOn(DocumentLoaderLocal, 'parse').mockReturnValue({});
    const validateMock = jest.spyOn(DocumentLoaderLocal, 'validate').mockReturnValue({
        openapi: '',
        info: {
            title: '',
            version: '',
        },
        paths: {},
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create instance without errors', () => {
        expect(() => new DocumentLoaderLocal({ path: '' })).not.toThrow();
    });

    it('should resolve path with current working directory', async () => {
        cwdMock.mockReturnValueOnce('/root');

        const documentLoader = new DocumentLoaderLocal({ path: 'someDirectory/document.json' });
        await documentLoader.load();

        expect(resolveMock).toBeCalledTimes(1);
        expect(resolveMock).toBeCalledWith('/root', 'someDirectory/document.json');
    });

    it('should throw when path is directory path', async () => {
        resolveMock.mockReturnValueOnce('/resolved/path/someDirectory/');
        extnameMock.mockReturnValueOnce('');

        const documentLoader = new DocumentLoaderLocal({ path: 'someDirectory/' });
        await expect(documentLoader.load()).rejects.toThrowError('DocumentLoaderError');
    });

    it('should throw when resolved file has unsupported extension', async () => {
        resolveMock.mockReturnValueOnce('/resolved/path/someDirectory/document.txt');
        extnameMock.mockReturnValueOnce('.txt');

        const documentLoader = new DocumentLoaderLocal({ path: 'someDirectory/document.txt' });
        await expect(documentLoader.load()).rejects.toThrowError('DocumentLoaderError');
    });

    it('should read file by resolved path', async () => {
        resolveMock.mockReturnValueOnce('/resolved/path/someDirectory/document.json');

        const documentLoader = new DocumentLoaderLocal({ path: 'someDirectory/document.json' });
        await documentLoader.load();

        expect(readFileMock).toBeCalledTimes(1);
        expect(readFileMock).toBeCalledWith('/resolved/path/someDirectory/document.json', { encoding: 'utf8' });
    });

    it('should parse json document', async () => {
        extnameMock.mockReturnValueOnce('.json');
        readFileMock.mockResolvedValueOnce('{"openapi":""}');

        const documentLoader = new DocumentLoaderLocal({ path: '/document.json' });
        await documentLoader.load();

        expect(parseMock).toBeCalledTimes(1);
        expect(parseMock).toBeCalledWith('{"openapi":""}', 'json');
    });

    it('should parse yaml document', async () => {
        extnameMock.mockReturnValueOnce('.yaml');
        readFileMock.mockResolvedValueOnce('---\nopenapi: ""');

        const documentLoader = new DocumentLoaderLocal({ path: '/document.yaml' });
        await documentLoader.load();

        expect(parseMock).toBeCalledTimes(1);
        expect(parseMock).toBeCalledWith('---\nopenapi: ""', 'yaml');
    });

    it('should parse yml document', async () => {
        extnameMock.mockReturnValueOnce('.yml');
        readFileMock.mockResolvedValueOnce('---\nopenapi: ""');

        const documentLoader = new DocumentLoaderLocal({ path: '/document.yml' });
        await documentLoader.load();

        expect(parseMock).toBeCalledTimes(1);
        expect(parseMock).toBeCalledWith('---\nopenapi: ""', 'yaml');
    });

    it('should validate document', async () => {
        parseMock.mockReturnValueOnce({ openapi: '', info: {}, paths: {} });

        const documentLoader = new DocumentLoaderLocal({ path: '/document.yml' });
        await documentLoader.load();

        expect(validateMock).toBeCalledTimes(1);
        expect(validateMock).toBeCalledWith({ openapi: '', info: {}, paths: {} });
    });
});
