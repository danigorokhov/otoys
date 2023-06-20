import Fastify from 'fastify';
import cors from '@fastify/cors';
import {ping} from './modules/ping';
import {api} from './modules/api';

const PORT = 3030;

const fastify = Fastify({
    logger: true, // TODO change depends on NODE_ENVIRONMENT
});

fastify.register(cors, {
    origin: [/^http:\/\/localhost/, /local\.otoys\.tech:3000$/], // TODO add production domain
});
fastify.register(ping);
fastify.register(api);

const start = async () => {
    try {
        await fastify.listen({ port: PORT });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();