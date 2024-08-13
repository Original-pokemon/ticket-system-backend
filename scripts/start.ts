#!/usr/bin/env tsx

import { config } from "#root/config.js";
import logger from "#root/logger.js";
import database from "#root/services/database/index.js";
import S3Service from "#root/services/s3/index.js";
import { createServer } from "#root/services/server/index.js";
import { onShutdown } from "node-graceful-shutdown";

try {
  await database.init();
  await S3Service.initializeBucket();
  const server = await createServer();

  // Graceful shutdown
  onShutdown(async () => {
    logger.info("shutdown");
    await server.close();
  });

  await server.listen({
    host: config.HOST,
    port: config.PORT,
  });
} catch (error) {
  logger.error(error);
  process.exit(1);
}
