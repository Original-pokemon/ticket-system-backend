#!/usr/bin/env tsx

import { config } from '#root/config.js';
import { createServer } from '#root/index.js';
import { logger } from '#root/logger.js';
import { onShutdown } from 'node-graceful-shutdown';

try {
    const server = await createServer();

    // Graceful shutdown
    onShutdown(async () => {
        logger.info("shutdown");
        await server.close();
    });

    await server.listen({
        host: config.LISTEN_SERVER_HOST,
        port: config.LISTEN_SERVER_PORT,
    });

    // if (config.isProd) {
    // }

} catch (error) {
    logger.error(error);
    process.exit(1);
}
