#!/usr/bin/env tsx

import { config } from '#root/config.js';
import { logger } from '#root/logger.js';
import DataBase from '#root/services/database/index.js';
import { createServer } from '#root/services/server/index.js';
import { onShutdown } from 'node-graceful-shutdown';

try {
    const server = await createServer();
    const database = new DataBase()

    database.init()

    // Graceful shutdown
    onShutdown(async () => {
        logger.info("shutdown");
        await server.close();
    });

    await server.listen({
        host: config.LISTEN_SERVER_HOST,
        port: config.LISTEN_SERVER_PORT,
    });

} catch (error) {
    logger.error(error);
    process.exit(1);
}
