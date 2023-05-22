import { FastifyPluginAsync } from "fastify";
import { generateApi } from 'swagger-typescript-api';

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
                        generatorSettings: {
                            type: 'object',
                            properties: {
                                pathWhitelist: {
                                    type: 'string',
                                },
                            },
                            required: [
                                'pathWhitelist',
                            ],
                        },
                    },
                    required: [
                        'document',
                    ],
                },
            },
        },
        async (_request, reply) => {
            const body = _request.body as { document: string, generatorSettings: { pathWhitelist?: string } }; // TODO common type

            const generatedCode = await generateApi({
                spec: JSON.parse(body.document),
                generateClient: false,
                typeSuffix: body.generatorSettings.pathWhitelist,
            });

            const { content: result } = generatedCode.files[0];

            reply
                .code(200)
                .send({ result });
        },
    );
};
