import { logger } from "#root/logger.js";
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";

import { routers } from "#root/routes/index.js";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { authPlugin } from "#root/plugins/auth.js";
import { modelsPlugin } from "#root/plugins/models.js";
import { authRouters } from "#root/routes/auth.js";
import dataBase from "../database/index.js";
import { swaggerOptions } from "../swagger/options.js";

export const createServer = async () => {
  const server = fastify({
    logger,
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

  server.setErrorHandler(async (error, _request, response) => {
    logger.error(error);

    await response.status(500).send({ error: "Oops! Something went wrong." });
  });

  server.get("/", () => ({ status: true }));

  return server;
};
