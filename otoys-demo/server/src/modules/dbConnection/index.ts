import { FastifyInstance } from 'fastify';
import postgres from '@fastify/postgres';

export const registerDbConnection = (fastify: FastifyInstance) => {
    const {config} = fastify;

    return fastify.register(postgres, {
        connectionString:
            `postgres://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOSTNAME}:${config.DB_PORT}/${config.DB_NAME}`,
    });
};
