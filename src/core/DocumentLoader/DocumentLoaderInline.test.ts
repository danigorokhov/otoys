import { expect, jest, describe, it } from '@jest/globals';

import { DocumentLoaderInline } from './DocumentLoaderInline';

describe('DocumentLoader -> DocumentLoaderInline', () => {
    const parseMock = jest.spyOn(DocumentLoaderInline, 'parse').mockReturnValueOnce({});
    const validateMock = jest.spyOn(DocumentLoaderInline, 'validate').mockReturnValue({
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
        expect(
            () => new DocumentLoaderInline({ content: '{}', documentType: 'json' }),
        ).not.toThrow();
    });

    it('should parse json document', async () => {
        const documentLoader = new DocumentLoaderInline({
            content: '{"openapi":""}',
            documentType: 'json',
        });

        await documentLoader.load();

        expect(parseMock).toBeCalledTimes(1);
        expect(parseMock).toBeCalledWith('{"openapi":""}', 'json');
    });

    it('should parse yaml document', async () => {
        const documentLoader = new DocumentLoaderInline({
            content: '---\nopenapi: ""',
            documentType: 'yaml',
        });

        await documentLoader.load();

        expect(parseMock).toBeCalledTimes(1);
        expect(parseMock).toBeCalledWith('---\nopenapi: ""', 'yaml');
    });

    it('should validate document', async () => {
        parseMock.mockReturnValueOnce({
            openapi: '',
            info: {},
            paths: {},
        });

        const documentLoader = new DocumentLoaderInline({
            content: '{}',
            documentType: 'json',
        });
        await documentLoader.load();

        expect(validateMock).toBeCalledTimes(1);
        expect(validateMock).toBeCalledWith({
            openapi: '',
            info: {},
            paths: {},
        });
    });

    it('should return validated document', async () => {
        const documentValidated = {
            openapi: '3.0.0',
            info: {
                version: 'Version',
                title: 'Title',
            },
            paths: {},
        };

        validateMock.mockReturnValueOnce(documentValidated);

        const documentLoader = new DocumentLoaderInline({
            content: '{}',
            documentType: 'json',
        });

        const document = await documentLoader.load();

        expect(document).toStrictEqual({
            openapi: '3.0.0',
            info: {
                version: 'Version',
                title: 'Title',
            },
            paths: {},
        });
    });
});
