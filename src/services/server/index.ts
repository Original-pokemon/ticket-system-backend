import { logger } from '#root/logger.js';
import fastify from 'fastify';

export const createServer = async () => {
    const server = fastify({
        logger,
    });

    server.setErrorHandler(async (error, request, response) => {
        logger.error(error);

        await response.status(500).send({ error: "Oops! Something went wrong." });
    });

    server.get("/", () => ({ status: true }));

    return server;
};
