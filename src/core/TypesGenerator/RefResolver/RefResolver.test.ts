import { expect, describe, it, jest } from '@jest/globals';
import { OpenAPIObject } from 'openapi3-ts/oas30';

import { RefResolver } from './RefResolver';

describe('TypesGenerator/TypesGeneratorV3/RefResolver', () => {
    let document: OpenAPIObject
    let resolver: RefResolver;

    beforeEach(() => {
        document = {
            openapi: '3.0.2',
            info: {
                title: 'Test',
                version: '0.0.1'
            },
            paths: {
                '/path/to/api': {
                    description: '/path/to/api',
                },
            },
            components: {
                requestBodies: {
                    TestRequestBody: {
                        description: 'TestRequestBody',
                        content: {},
                    },
                    TestRequestBodyRef: {
                        $ref: '#/components/requestBodies/TestRequestBody',
                    },
                },
                responses: {
                    TestResponse: {
                        description: 'TestResponse',
                    },
                    TestResponseRef: {
                        $ref: '#/components/responses/TestResponse',
                    },
                },
                schemas: {
                    TestSchema: {
                        description: 'TestSchema',
                    },
                    // TODO test ref for schemas
                },
            },
        };

        resolver = new RefResolver(document);
    });

    describe('isValidURL', () => {
        it('should return false for invalid URLs', () => {
            expect(resolver.isValidURL('#')).toBe(false);
            expect(resolver.isValidURL('#/components/schemas/Test')).toBe(false);
            expect(resolver.isValidURL('petstore.json')).toBe(false);
            expect(resolver.isValidURL('petstore.json#/paths/test')).toBe(false);
            expect(resolver.isValidURL('//test.com')).toBe(false);
        });

        it('should return true for valid URLs', () => {
            expect(resolver.isValidURL('http://test.com')).toBe(true);
            expect(resolver.isValidURL('https://test.com')).toBe(true);
            expect(resolver.isValidURL('https://test.com/test/path')).toBe(true);
            expect(resolver.isValidURL('https://test.com/test/path#hash')).toBe(true);
            expect(resolver.isValidURL('https://test.com/test/path?query')).toBe(true);
        });
    });

    describe('validateRef', () => {
        it('should throw if passed reference is URL', () => {
            expect(
                () => resolver.validateRef('https://test.com')
            ).toThrow(
                'RefResolver: reference to schema by URL isn\'t supported. Passed reference: https://test.com',
            )
        });

        it('should throw if passed reference is file reference', () => {
            expect(
                () => resolver.validateRef('petstore.json#/components'),
            ).toThrow(
                'RefResolver: reference to schema by different file isn\'t supported. Passed reference: petstore.json#/components',
            );
        });

        it('should throw if passed reference contains invalid characters', () => {
            expect(
                () => resolver.validateRef('#/com pone nts'),
            ).toThrow(
                'RefResolver: reference has invalid format. Passed reference: #/com pone nts',
            );
        });

        it('should return valid reference', () => {
            expect(resolver.validateRef('#/components')).toBe('#/components');
            expect(resolver.validateRef('#/components/schemas/Test')).toBe('#/components/schemas/Test');
        });
    });

    describe('parseRef', () => {
        it('should use document as root', () => {
            const ref = '#/components/test';

            jest.spyOn(resolver, 'validateRef').mockReturnValueOnce(ref);

            expect(resolver.parseRef(ref)).toHaveProperty('root', document);
        });

        it('should split reference into array without "/"', () => {
            const ref = '#/components/test';

            jest.spyOn(resolver, 'validateRef').mockReturnValueOnce(ref);

            expect(resolver.parseRef(ref)).toHaveProperty('path', ['components', 'test']);
        });

        it('should unescape slash', () => {
            const ref = '#/components/te~1st';

            jest.spyOn(resolver, 'validateRef').mockReturnValueOnce(ref);

            expect(resolver.parseRef(ref)).toHaveProperty('path', ['components', 'te/st']);
        });

        it('should unescape tilde', () => {
            const ref = '#/components/te~01st';

            jest.spyOn(resolver, 'validateRef').mockReturnValueOnce(ref);

            expect(resolver.parseRef(ref)).toHaveProperty('path', ['components', 'te~1st']);
        });

        it('should filter empty parts of ref', () => {
            const ref = '#/components//test';

            jest.spyOn(resolver, 'validateRef').mockReturnValueOnce(ref);

            expect(resolver.parseRef(ref)).toHaveProperty('path', ['components', 'test']);
        });
    });

    describe('resolvePath', () => {
        it('should resolve object by reference', () => {
            const ref = '#/paths/~1path~1to~1api';

            jest.spyOn(resolver, 'parseRef').mockReturnValueOnce({
                root: document,
                path: ['paths', '/path/to/api'],
            });

            expect(resolver.resolvePath(ref)).toStrictEqual({
                description: '/path/to/api',
            });
        });

        it('should throw if there isn\'t object by passed reference', () => {
            const ref = '#/invalid/ref';

            jest.spyOn(resolver, 'parseRef').mockReturnValueOnce({
                root: document,
                path: ['invalid', 'ref'],
            });

            expect(
                () => resolver.resolvePath(ref),
            ).toThrow(
                'RefResolver: path resolving failed. Cannot resolve object by passed reference. Passed reference: #/invalid/ref',
            );
        });

        it.todo('should throw if resolved object isn\'t PathItemObject');
    });

    describe('resolveRequestBody', () => {
        it('should resolve requestBodyObject by reference', () => {
            const ref = '#/components/requestBodies/TestRequestBody';

            jest.spyOn(resolver, 'parseRef').mockReturnValueOnce({
                root: document,
                path: ['components', 'requestBodies', 'TestRequestBody'],
            });

            expect(resolver.resolveRequestBody(ref)).toStrictEqual({
                content: {},
                description: 'TestRequestBody',
            });
        });

        it('should resolve referenceObject by reference', () => {
            const ref = '#/components/requestBodies/TestRequestBodyRef';

            jest.spyOn(resolver, 'parseRef').mockReturnValueOnce({
                root: document,
                path: ['components', 'requestBodies', 'TestRequestBodyRef'],
            });

            expect(resolver.resolveRequestBody(ref)).toStrictEqual({
                $ref: '#/components/requestBodies/TestRequestBody',
            });
        });

        it('should throw if there isn\'t object by passed reference', () => {
            const ref = '#/invalid/ref';

            jest.spyOn(resolver, 'parseRef').mockReturnValueOnce({
                root: document,
                path: ['invalid', 'ref'],
            });

            expect(
                () => resolver.resolveRequestBody(ref),
            ).toThrow(
                'RefResolver: requestBody resolving failed. Cannot resolve object by passed reference. Passed reference: #/invalid/ref',
            );
        });

        it.todo('should throw if resolved object isn\'t either RequestBodyObject or ReferenceObject');
    });

    describe('resolveRequestBodyDeep', () => {
        it('should resolve nested requestBody', () => {
            const ref = '#/components/requestBodies/TestRequestBody1';

            const document: OpenAPIObject = {
                openapi: '3.0.2',
                info: {
                    title: 'Test',
                    version: '0.0.1'
                },
                paths: {},
                components: {
                    requestBodies: {
                        TestRequestBody1: {
                            $ref: '#/components/requestBodies/TestRequestBody2',
                        },
                        TestRequestBody2: {
                            content: {},
                            description: 'TestRequestBody2',
                        },
                    },
                },
            };

            jest.spyOn(resolver, 'parseRef')
                .mockReturnValueOnce({
                    root: document,
                    path: ['components', 'requestBodies', 'TestRequestBody1'],
                })
                .mockReturnValueOnce({
                    root: document,
                    path: ['components', 'requestBodies', 'TestRequestBody2'],
                });

            expect(resolver.resolveRequestBodyDeep(ref)).toStrictEqual({
                content: {},
                description: 'TestRequestBody2',
            });
        });

        it('should throw for looped references', () => {
            const ref = '#/components/requestBodies/TestRequestBody1';

            const document: OpenAPIObject = {
                openapi: '3.0.2',
                info: {
                    title: 'Test',
                    version: '0.0.1'
                },
                paths: {},
                components: {
                    requestBodies: {
                        TestRequestBody1: {
                            $ref: '#/components/requestBodies/TestRequestBody1',
                        },
                    },
                },
            };

            jest.spyOn(resolver, 'parseRef').mockReturnValue({
                root: document,
                path: ['components', 'requestBodies', 'TestRequestBody1'],
            });

            expect(
                () => resolver.resolveRequestBodyDeep(ref, 100),
            ).toThrow(
                'RefResolver: requestBody resolving failed. Too many nested references, limit 100 exceeded. Passed reference: #/components/requestBodies/TestRequestBody1',
            );
        });
    });

    describe('resolveResponse', () => {
        it('should resolve responseObject by reference', () => {
            const ref = '#/components/responses/TestResponse';

            jest.spyOn(resolver, 'parseRef').mockReturnValueOnce({
                root: document,
                path: ['components', 'responses', 'TestResponse'],
            });

            expect(resolver.resolveResponse(ref)).toStrictEqual({
                description: 'TestResponse',
            });
        });

        it('should resolve referenceObject by reference', () => {
            const ref = '#/components/responses/TestResponseRef';

            jest.spyOn(resolver, 'parseRef').mockReturnValueOnce({
                root: document,
                path: ['components', 'responses', 'TestResponseRef'],
            });

            expect(resolver.resolveResponse(ref)).toStrictEqual({
                $ref: '#/components/responses/TestResponse',
            });
        });

        it('should throw if there isn\'t object by passed reference', () => {
            const ref = '#/invalid/ref';

            jest.spyOn(resolver, 'parseRef').mockReturnValueOnce({
                root: document,
                path: ['invalid', 'ref'],
            });

            expect(
                () => resolver.resolveResponse(ref),
            ).toThrow(
                'RefResolver: response resolving failed. Cannot resolve object by passed reference. Passed reference: #/invalid/ref',
            );
        });

        it.todo('should throw if resolved object isn\'t either ResponseObject or ReferenceObject');
    });

    describe('resolveResponseDeep', () => {
        it('should resolve nested response', () => {
            const ref = '#/components/responses/TestResponse1';

            const document: OpenAPIObject = {
                openapi: '3.0.2',
                info: {
                    title: 'Test',
                    version: '0.0.1'
                },
                paths: {},
                components: {
                    responses: {
                        TestResponse1: {
                            $ref: '#/components/responses/TestResponse2',
                        },
                        TestResponse2: {
                            description: 'TestResponse2',
                        },
                    },
                },
            };

            jest.spyOn(resolver, 'parseRef')
                .mockReturnValueOnce({
                    root: document,
                    path: ['components', 'responses', 'TestResponse1'],
                })
                .mockReturnValueOnce({
                    root: document,
                    path: ['components', 'responses', 'TestResponse2'],
                });

            expect(resolver.resolveResponseDeep(ref)).toStrictEqual({
                description: 'TestResponse2',
            });
        });

        it('should throw for looped references', () => {
            const ref = '#/components/responses/TestResponse1';

            const document: OpenAPIObject = {
                openapi: '3.0.2',
                info: {
                    title: 'Test',
                    version: '0.0.1'
                },
                paths: {},
                components: {
                    responses: {
                        TestResponse1: {
                            $ref: '#/components/responses/TestResponse1',
                        },
                    },
                },
            };

            jest.spyOn(resolver, 'parseRef').mockReturnValue({
                root: document,
                path: ['components', 'responses', 'TestResponse1'],
            });

            expect(
                () => resolver.resolveResponseDeep(ref, 100),
            ).toThrow(
                'RefResolver: response resolving failed. Too many nested references, limit 100 exceeded. Passed reference: #/components/responses/TestResponse1',
            );
        });
    });

    describe('resolveSchema', () => {
        it('should resolve object by reference', () => {
            const ref = '#/components/schemas/TestSchema';

            jest.spyOn(resolver, 'parseRef').mockReturnValueOnce({
                root: document,
                path: ['components', 'schemas', 'TestSchema'],
            });

            expect(resolver.resolveSchema(ref)).toStrictEqual([
                'TestSchema',
                { description: 'TestSchema' },
            ]);
        });

        it('should throw if there isn\'t object by passed reference', () => {
            const ref = '#/invalid/ref';

            jest.spyOn(resolver, 'parseRef').mockReturnValueOnce({
                root: document,
                path: ['invalid', 'ref'],
            });

            expect(
                () => resolver.resolveSchema(ref),
            ).toThrow(
                'RefResolver: schema resolving failed. Cannot resolve object by passed reference. Passed reference: #/invalid/ref',
            );
        });

        it.todo('should throw if resolved object isn\'t SchemaObject');
        it.todo('tests for schemaName validation');
    });
});
