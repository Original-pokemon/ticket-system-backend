import { FastifyPluginCallback } from "fastify";
import { authenticate } from "#root/controllers/handlers/authenticate.js";
import { taskPerformerRouters } from "./user/task-performer.router.js";
import { managerRouters } from "./user/manager.router.js";
import { petrolStationRouters } from "./user/petrol-station.router.js";
import { groupRouters } from "./user/group.router.js";
import { userRouters } from "./user/user.router.js";
import { categoryRouters } from "./ticket/category.router.js";
import { bushRouters } from "./user/bush.router.js";
import { attachmentRouters } from "./ticket/attachment.router.js";
import { commentRouters } from "./ticket/comment.router.js";
import { priorityRouters } from "./ticket/priority.router.js";
import { statusHistoryRouters } from "./ticket/status-history.router.js";
import { statusRouters } from "./ticket/status.router.js";
import { tagWordRouters } from "./ticket/tag-words.router.js";
import { ticketRouters } from "./ticket/ticket.router.js";
import { APIRoute } from "./user/api-route.js";

export const routers: FastifyPluginCallback = (instance, _options, done) => {
  instance.addHook("preHandler", authenticate);

  instance.get(APIRoute.CheckAuth, (request, reply) => {
    reply.send({ ok: true });
  });

  instance.register(taskPerformerRouters);
  instance.register(managerRouters);
  instance.register(petrolStationRouters);
  instance.register(groupRouters);
  instance.register(userRouters);
  instance.register(categoryRouters);
  instance.register(bushRouters);
  instance.register(attachmentRouters);
  instance.register(commentRouters);
  instance.register(priorityRouters);
  instance.register(statusHistoryRouters);
  instance.register(statusRouters);
  instance.register(tagWordRouters);
  instance.register(ticketRouters);

  done();
};
