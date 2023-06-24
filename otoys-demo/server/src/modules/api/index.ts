import { FastifyPluginAsync } from 'fastify';
import { generateApi as swaggerTypescriptApiGenerate } from 'swagger-typescript-api';

// TODO use from node_modules, after publishing @otoys/core
import { generate as otoysGenerate } from '../core';

export const api: FastifyPluginAsync = async (fastify) => {
    fastify.post(
        '/api/generate',
        {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        document: {
                            type: 'string',
                        },
                        generatorType: {
                            type: 'string',
                            enum: [
                                'otoys',
                                'swagger-typescript-api',
                            ],
                        },
                        generatorSettings: {
                            type: 'object',
                            properties: {
                                pathWhitelist: {
                                    type: 'string',
                                },
                                typeSuffix: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                    required: [
                        'document',
                        'generatorType',
                    ],
                },
            },
        },
        async (_request, reply) => {
            const { document, generatorType, generatorSettings } = _request.body as {
                document: string;
                generatorType: 'otoys' | 'swagger-typescript-api';
                generatorSettings: {
                    // otoys
                    pathWhitelist?: string;
                    // swagger-typescript-api
                    typeSuffix?: string;
                };
            }; // TODO common type (see client/@types)

            let result: string;
            if (generatorType === 'swagger-typescript-api') {
                const generatedCode = await swaggerTypescriptApiGenerate({
                    spec: JSON.parse(document), // TODO support yaml
                    generateClient: false,
                    typeSuffix: generatorSettings.typeSuffix,
                });

                result = generatedCode.files[0].content;
            } else {
                result = await otoysGenerate({
                    documentLoader: {
                        type: 'inline',
                        documentType: 'json', // TODO support yaml
                        content: document,
                    },
                    output: {
                        type: 'inline'
                    },
                    pathWhitelist: generatorSettings.pathWhitelist,
                });
            }

            reply
                .code(200)
                .send({ result });
        },
    );
};
