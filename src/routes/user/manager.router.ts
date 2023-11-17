import {
  createManagerHandler,
  deleteManagerHandler,
  getManagerHandler,
  getManagersHandler,
  updateManagerHandler,
} from "#root/controllers/handlers/user/manager.handler.js";
import {
  createManagerSchema,
  deleteManagerSchema,
  getManagerSchema,
  getManagersSchema,
  updateManagerSchema,
} from "#root/controllers/schemas/user/manager.schema.js";
import { FastifyPluginCallback } from "fastify";

import { Manager } from "@prisma/client";

import { APIRoute } from "./api-route.js";

const getManagersOptions = {
  schema: getManagersSchema,
  handler: getManagersHandler,
};

const getManagerOptions = {
  schema: getManagerSchema,
  handler: getManagerHandler,
};

const createManagerOptions = {
  schema: createManagerSchema,
  handler: createManagerHandler,
};

const updateManagerOptions = {
  schema: updateManagerSchema,
  handler: updateManagerHandler,
};

const deleteManagerOptions = {
  schema: deleteManagerSchema,
  handler: deleteManagerHandler,
};

export const managerRouters: FastifyPluginCallback = (
  instance,
  _options,
  done,
) => {
  instance.get(APIRoute.Manager.All, getManagersOptions);

  instance.get<{
    Params: {
      id: string;
    };
  }>(APIRoute.Manager.Info, getManagerOptions);

  instance.post<{
    Body: Manager;
  }>(APIRoute.Manager.Create, createManagerOptions);

  instance.put<{
    Body: Manager & { petrol_stations: string[] };
  }>(APIRoute.Manager.Update, updateManagerOptions);

  instance.delete<{
    Params: {
      id: string;
    };
  }>(APIRoute.Manager.Delete, deleteManagerOptions);

  done();
};
