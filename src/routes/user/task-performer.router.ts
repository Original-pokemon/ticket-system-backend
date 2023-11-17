import {
  createTaskPerformerHandler,
  deleteTaskPerformerHandler,
  getTaskPerformerHandler,
  getTaskPerformersHandler,
  updateTaskPerformerHandler,
} from "#root/controllers/handlers/user/task-performer.handler.js";
import {
  createTaskPerformerSchema,
  deleteTaskPerformerSchema,
  getTaskPerformerSchema,
  getTaskPerformersSchema,
  updateTaskPerformerSchema,
} from "#root/controllers/schemas/user/task-performer.schema.js";
import { FastifyPluginCallback } from "fastify";

import { TaskPerformer } from "@prisma/client";

import { APIRoute } from "./api-route.js";

const getTaskPerformersOptions = {
  schema: getTaskPerformersSchema,
  handler: getTaskPerformersHandler,
};

const getTaskPerformerOptions = {
  schema: getTaskPerformerSchema,
  handler: getTaskPerformerHandler,
};

const createTaskPerformerOptions = {
  schema: createTaskPerformerSchema,
  handler: createTaskPerformerHandler,
};

const updateTaskPerformerOptions = {
  schema: updateTaskPerformerSchema,
  handler: updateTaskPerformerHandler,
};

const deleteTaskPerformerOptions = {
  schema: deleteTaskPerformerSchema,
  handler: deleteTaskPerformerHandler,
};

export const taskPerformerRouters: FastifyPluginCallback = (
  instance,
  _options,
  done,
) => {
  instance.get(APIRoute.TaskPerformers.All, getTaskPerformersOptions);

  instance.get<{
    Params: {
      id: string;
    };
  }>(APIRoute.TaskPerformers.Info, getTaskPerformerOptions);

  instance.post<{
    Body: TaskPerformer;
  }>(APIRoute.TaskPerformers.Create, createTaskPerformerOptions);

  instance.put<{
    Body: TaskPerformer;
  }>(APIRoute.TaskPerformers.Update, updateTaskPerformerOptions);

  instance.delete<{
    Params: {
      id: string;
    };
  }>(APIRoute.TaskPerformers.Delete, deleteTaskPerformerOptions);

  done();
};
