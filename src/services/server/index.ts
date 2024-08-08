import { logger } from "#root/logger.js";
import fastify from "fastify";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifyStatic from "@fastify/static";

import { routers } from "#root/routes/index.js";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { authPlugin } from "#root/plugins/auth.js";
import { modelsPlugin } from "#root/plugins/models.js";
import { mkdir } from "node:fs/promises";
import { staticFilePrefix, uploadsDirectory } from "#root/const.js";
import { authRouters } from "#root/routes/auth.js";
import dataBase from "../database/index.js";
import { swaggerOptions } from "../swagger/options.js";

export const createServer = async () => {
  const server = fastify({
    logger,
  });

  await mkdir(uploadsDirectory, { recursive: true });

  server.register(fastifyStatic, {
    root: uploadsDirectory,
    prefix: staticFilePrefix,
    setHeaders: (response) => {
      response.setHeader("Cache-Control", "public, max-age=31536000"); // 1 год кэширования
    },
  });

  server.register(cors, {
    origin: true,
    credentials: true,
    exposedHeaders: ["Authorization", "Content-Type", "X-Total-Count"],
    allowedHeaders: ["Authorization", "Content-Type", "X-Total-Count"],
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  });
  server.register(fastifySwagger, swaggerOptions);
  server.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "none",
      deepLinking: false,
      filter: true,
    },
    uiHooks: {
      onRequest(_request, _reply, next) {
        next();
      },
      preHandler(_request, _reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, _request, _reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
  server.register(modelsPlugin);
  server.register(authPlugin);
  server.register(authRouters);
  server.register(routers);

  server.addHook("onClose", async () => {
    await dataBase.disconnect();
  });

  server.setErrorHandler(async (error, request, response) => {
    const statusCode = error.statusCode || 500;
    const errorMessage =
      statusCode === 500 ? "Internal Server Error" : error.message;

    logger.error({ error, requestId: request.id });

    await response.status(statusCode).send({
      error: errorMessage,
    });
  });

  server.get("/", () => ({ status: true }));

  return server;
};
