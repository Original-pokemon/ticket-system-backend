import { logger } from "#root/logger.js";
import groupRouters from "#root/routes/user/group.router.js";
import userRouters from "#root/routes/user/user.router.js";
import fastify from "fastify";
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
import dataBase from "../database/index.js";

export const createServer = async () => {
  const server = fastify({
    logger,
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

  server.setErrorHandler(async (error, request, response) => {
    logger.error(error);

    await response.status(500).send({ error: "Oops! Something went wrong." });
  });

  server.get("/", () => ({ status: true }));

  return server;
};
