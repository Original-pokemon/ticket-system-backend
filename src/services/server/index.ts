import { logger } from "#root/logger.js";
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";

import {
  taskPerformerRouters,
  managerRouters,
  petrolStationRouters,
  groupRouters,
  userRouters,
  categoryRouters,
  bushRouters,
  attachmentRouters,
  commentRouters,
  priorityRouters,
  statusHistoryRouters,
  statusRouters,
  tagWordRouters,
  ticketRouters,
} from "#root/routes/index.js";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
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
  server.register(userRouters);
  server.register(groupRouters);
  server.register(taskPerformerRouters);
  server.register(managerRouters);
  server.register(petrolStationRouters);
  server.register(categoryRouters);
  server.register(bushRouters);
  server.register(attachmentRouters);
  server.register(commentRouters);
  server.register(priorityRouters);
  server.register(statusHistoryRouters);
  server.register(statusRouters);
  server.register(tagWordRouters);
  server.register(ticketRouters);

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
