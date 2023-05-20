import { FastifyPluginAsync } from "fastify";

export const ping: FastifyPluginAsync = async (fastify) => {
    fastify.get('/ping', (_request, reply) => {
        reply
            .code(200)
            .send({ ping: 'pong' });
    });
};
