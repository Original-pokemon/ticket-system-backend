import { FastifyPluginCallback } from "fastify/types/plugin.js";
import { StatusHistory } from "@prisma/client";
import {
  createStatusHistoryHandler,
  deleteStatusHistoryHandler,
  getStatusHistoryHandler,
  getStatusHistoriesHandler,
  updateStatusHistoryHandler,
} from "#root/controllers/handlers/ticket/status-history.handler.js";
import {
  createStatusHistorySchema,
  deleteStatusHistorySchema,
  getStatusHistorySchema,
  getStatusHistoriesSchema,
  updateStatusHistorySchema,
} from "#root/controllers/schemas/ticket/status-history.schema.js";

import { APIRoute } from "./api-route.js";

const getStatusHistoriesOptions = {
  schema: getStatusHistoriesSchema,
  handler: getStatusHistoriesHandler,
};

const getStatusHistoryOptions = {
  schema: getStatusHistorySchema,
  handler: getStatusHistoryHandler,
};

const createStatusHistoryOptions = {
  schema: createStatusHistorySchema,
  handler: createStatusHistoryHandler,
};

const updateStatusHistoryOptions = {
  schema: updateStatusHistorySchema,
  handler: updateStatusHistoryHandler,
};

const deleteStatusHistoryOptions = {
  schema: deleteStatusHistorySchema,
  handler: deleteStatusHistoryHandler,
};

export const statusHistoryRouters: FastifyPluginCallback = (
  instance,
  _options,
  done,
) => {
  instance.get(APIRoute.StatusHistory.All, getStatusHistoriesOptions);

  instance.get<{
    Params: {
      id: string;
    };
  }>(APIRoute.StatusHistory.Info, getStatusHistoryOptions);

  instance.post<{
    Body: StatusHistory;
  }>(APIRoute.StatusHistory.Create, createStatusHistoryOptions);

  instance.put<{
    Body: StatusHistory;
  }>(APIRoute.StatusHistory.Update, updateStatusHistoryOptions);

  instance.delete<{
    Params: {
      id: string;
    };
  }>(APIRoute.StatusHistory.Delete, deleteStatusHistoryOptions);

  done();
};
