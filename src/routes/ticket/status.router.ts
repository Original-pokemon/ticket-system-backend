import { FastifyPluginCallback } from "fastify/types/plugin.js";
import { Status } from "@prisma/client";
import {
  createStatusHandler,
  deleteStatusHandler,
  getStatusHandler,
  getStatusesHandler,
  updateStatusHandler,
} from "#root/controllers/handlers/ticket/status.handler.js";
import {
  createStatusSchema,
  deleteStatusSchema,
  getStatusSchema,
  getStatusesSchema,
  updateStatusSchema,
} from "#root/controllers/schemas/ticket/status.schema.js";

import { APIRoute } from "./api-route.js";

const getStatusesOptions = {
  schema: getStatusesSchema,
  handler: getStatusesHandler,
};

const getStatusOptions = {
  schema: getStatusSchema,
  handler: getStatusHandler,
};

const createStatusOptions = {
  schema: createStatusSchema,
  handler: createStatusHandler,
};

const updateStatusOptions = {
  schema: updateStatusSchema,
  handler: updateStatusHandler,
};

const deleteStatusOptions = {
  schema: deleteStatusSchema,
  handler: deleteStatusHandler,
};

export const statusRouters: FastifyPluginCallback = (
  instance,
  _options,
  done,
) => {
  instance.get(APIRoute.Status.All, getStatusesOptions);

  instance.get<{
    Params: {
      id: string;
    };
  }>(APIRoute.Status.Info, getStatusOptions);

  instance.post<{
    Body: Status;
  }>(APIRoute.Status.Create, createStatusOptions);

  instance.put<{
    Body: Status;
  }>(APIRoute.Status.Update, updateStatusOptions);

  instance.delete<{
    Params: {
      id: string;
    };
  }>(APIRoute.Status.Delete, deleteStatusOptions);

  done();
};
