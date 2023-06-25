import { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';

export const registerCors = (fastify: FastifyInstance) => {
    return fastify.register(cors, {
        origin: [/local\.otoys\.tech$/],
    });
};
