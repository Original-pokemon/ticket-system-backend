import { FastifyPluginCallback } from "fastify/types/plugin.js";
import { Priority } from "@prisma/client";
import {
  createPriorityHandler,
  deletePriorityHandler,
  getPriorityHandler,
  getPrioritiesHandler,
  updatePriorityHandler,
} from "#root/controllers/handlers/ticket/priority.handler.js";
import {
  createPrioritySchema,
  deletePrioritySchema,
  getPrioritySchema,
  getPrioritiesSchema,
  updatePrioritySchema,
} from "#root/controllers/schemas/ticket/priority.schema.js";

import { APIRoute } from "./api-route.js";

const getPrioritiesOptions = {
  schema: getPrioritiesSchema,
  handler: getPrioritiesHandler,
};

const getPriorityOptions = {
  schema: getPrioritySchema,
  handler: getPriorityHandler,
};

const createPriorityOptions = {
  schema: createPrioritySchema,
  handler: createPriorityHandler,
};

const updatePriorityOptions = {
  schema: updatePrioritySchema,
  handler: updatePriorityHandler,
};

const deletePriorityOptions = {
  schema: deletePrioritySchema,
  handler: deletePriorityHandler,
};

export const priorityRouters: FastifyPluginCallback = (
  instance,
  _options,
  done,
) => {
  instance.get(APIRoute.Priority.All, getPrioritiesOptions);

  instance.get<{
    Params: {
      id: number;
    };
  }>(APIRoute.Priority.Info, getPriorityOptions);

  instance.post<{
    Body: Priority;
  }>(APIRoute.Priority.Create, createPriorityOptions);

  instance.put<{
    Body: Priority;
  }>(APIRoute.Priority.Update, updatePriorityOptions);

  instance.delete<{
    Params: {
      id: number;
    };
  }>(APIRoute.Priority.Delete, deletePriorityOptions);

  done();
};
