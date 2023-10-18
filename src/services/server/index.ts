import { logger } from "#root/logger.js";
import fastify from "fastify";
import dataBase from "../database/index.js";

export const createServer = async () => {
  const server = fastify({
    logger,
  });
  server.addHook("onClose", async () => {
    await dataBase.disconnect();
  });

  server.setErrorHandler(async (error, request, response) => {
    logger.error(error);

    await response.status(500).send({ error: "Oops! Something went wrong." });
  });

  server.get("/", () => ({ status: true }));

  return server;
};
