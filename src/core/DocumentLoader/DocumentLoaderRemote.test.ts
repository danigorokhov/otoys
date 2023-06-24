import { expect, jest, describe, it } from '@jest/globals';
import * as gotModule from 'got';
import { CancelableRequest, Response } from 'got';

import { DocumentLoaderRemote } from './DocumentLoaderRemote';

describe('DocumentLoader -> DocumentLoaderRemote', () => {
    const gotJsonMock = jest.fn(() => ({
        openapi: '',
        info: {},
        paths: {},
    }));
    const gotMock = jest.spyOn(gotModule, 'default').mockImplementation(() => {
        return {
            json: gotJsonMock,
        } as unknown as CancelableRequest<Response<string>>;
    });

    const validateMock = jest.spyOn(DocumentLoaderRemote, 'validate').mockReturnValue({
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
        expect(() => new DocumentLoaderRemote({ url: '' })).not.toThrow();
    });

    it('should fetch document by url', async () => {
        const documentLoader = new DocumentLoaderRemote({ url: 'https://some.host/path' });
        await documentLoader.load();

        expect(gotMock).toBeCalledTimes(1);
        expect(gotMock).toBeCalledWith('https://some.host/path');
    });

    it('should validate document', async () => {
        gotJsonMock.mockReturnValue({ openapi: '3.0.1', info: {}, paths: {} });

        const documentLoader = new DocumentLoaderRemote({ url: 'https://some.host/path' });
        await documentLoader.load();

        expect(validateMock).toBeCalledTimes(1);
        expect(validateMock).toBeCalledWith({ openapi: '3.0.1', info: {}, paths: {} });
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

        const documentLoader = new DocumentLoaderRemote({ url: 'https://some.host/path' });

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
