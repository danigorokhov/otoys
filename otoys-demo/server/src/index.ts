import Fastify from 'fastify';

import { registerEnv } from './modules/env';
import {registerCors} from './modules/cors';
import {ping} from './modules/ping';
import {api} from './modules/api';

const fastify = Fastify({
    logger: true, // TODO change depends on NODE_ENVIRONMENT
});

const initialize = async () => {
    // Wait env config loading, it's using in next registers
    await registerEnv(fastify);

    registerCors(fastify);

    fastify.register(ping);
    fastify.register(api);
};

const start = async () => {
    try {
        await initialize();
        await fastify.listen({ port: fastify.config.PORT });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
