import { expect, describe, it } from '@jest/globals';
import { OpenAPIObject } from 'openapi3-ts';
import { YAMLParseError } from 'yaml';

import { DocumentLoaderBase } from './DocumentLoaderBase';

class TestDocumentLoaderBase extends DocumentLoaderBase {
    public load() {
        return Promise.resolve({} as OpenAPIObject);
    }
}

describe('DocumentLoader -> DocumentLoaderBase', () => {
    it('should provide parse, validate and load methods to derived class', () => {
        const documentLoader = new TestDocumentLoaderBase();

        expect(TestDocumentLoaderBase.parse).toBeDefined();
        expect(TestDocumentLoaderBase.validate).toBeDefined();
        expect(documentLoader.load).toBeDefined();
    });

    it('should parse json document', () => {
        const documentRaw = '{"openapi": "3.0.2","info":{"title":"Swagger Petstore - OpenAPI 3.0"}}';
        const documentExpected = {
            openapi: '3.0.2',
            info: { title: 'Swagger Petstore - OpenAPI 3.0' },
        };

        expect(TestDocumentLoaderBase.parse(documentRaw, 'json')).toStrictEqual(documentExpected);
    });

    it('should throw parse error for incorrect json document', () => {
        const documentRaw = 'incorrectJson';

        expect(() => TestDocumentLoaderBase.parse(documentRaw, 'json')).toThrowError(SyntaxError);
    })

    it('should parse yaml document', () => {
        const documentRaw = 'openapi: 3.0.2\ninfo:\n    title: Swagger Petstore - OpenAPI 3.0';
        const documentExpected = {
            openapi: '3.0.2',
            info: { title: 'Swagger Petstore - OpenAPI 3.0' },
        };

        expect(TestDocumentLoaderBase.parse(documentRaw, 'yaml')).toStrictEqual(documentExpected);
    });

    it('should throw parse error for incorrect yaml document', () => {
        const documentRaw = '    incorrect: \n yaml';

        expect(() => TestDocumentLoaderBase.parse(documentRaw, 'yaml')).toThrowError(YAMLParseError);
    });
});
