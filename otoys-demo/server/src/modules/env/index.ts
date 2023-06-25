import { FastifyInstance } from 'fastify';
import env, { FastifyEnvOptions } from '@fastify/env';

const schema = {
    type: 'object',
    required: [
        'PORT',
        'DB_USER',
        'DB_PASSWORD',
        'DB_HOSTNAME',
        'DB_PORT',
        'DB_NAME',
    ],
    properties: {
        PORT: {
            type: 'number',
            default: 3030,
        },
        DB_USER: {
            type: 'string',
            default: 'postgres',
        },
        DB_PASSWORD: {
            type: 'string',
        },
        DB_HOSTNAME: {
            type: 'string',
            default: 'localhost',
        },
        DB_PORT: {
            type: 'string',
            default: '5432',
        },
        DB_NAME: {
            type: 'string',
            default: 'otoys',
        },
    },
};

const options: FastifyEnvOptions = {
    confKey: 'config',
    schema,
    dotenv: true,
    data: process.env,
};

// TODO automate schema generation like in @otoys/core
declare module 'fastify' {
    interface FastifyInstance {
        config: {
            PORT: number;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_HOSTNAME: string;
            DB_PORT: string;
            DB_NAME: string;
        };
    }
}

export const registerEnv = (fastify: FastifyInstance) => {
    return fastify.register(env, options);
};
