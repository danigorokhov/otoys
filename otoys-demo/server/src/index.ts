import Fastify from 'fastify';

const PORT = 3030;

const fastify = Fastify({
    logger: true, // TODO change depends on NODE_ENVIRONMENT
});

fastify.get('/', (_request, reply) => {
    reply.send({ hello: 'world' });
});

const start = async () => {
    try {
        await fastify.listen({ port: PORT });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
