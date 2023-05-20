import { FastifyPluginAsync } from "fastify";

export const api: FastifyPluginAsync = async (fastify) => {
    fastify.post('/api/generate', (_request, reply) => {
        reply
            .code(200)
            .send({ code: `type Hello = 'world!';\n/* ${Date.now()} */` });
    });
};
