import { FastifyPluginCallback } from "fastify/types/plugin.js";
import { Bush } from "@prisma/client";
import {
  createBushHandler,
  deleteBushHandler,
  getBushHandler,
  getBushesHandler,
  updateBushHandler,
} from "#root/controllers/handlers/user/bush.handler.js";
import {
  createBushSchema,
  deleteBushSchema,
  getBushSchema,
  getBushesSchema,
  updateBushSchema,
} from "#root/controllers/schemas/user/bush.schema.js";

import { APIRoute } from "./api-route.js";

const getBushesOptions = {
  schema: getBushesSchema,
  handler: getBushesHandler,
};

const getBushOptions = {
  schema: getBushSchema,
  handler: getBushHandler,
};

const createBushOptions = {
  schema: createBushSchema,
  handler: createBushHandler,
};

const updateBushOptions = {
  schema: updateBushSchema,
  handler: updateBushHandler,
};

const deleteBushOptions = {
  schema: deleteBushSchema,
  handler: deleteBushHandler,
};

export const bushRouters: FastifyPluginCallback = (
  instance,
  _options,
  done,
) => {
  instance.get(APIRoute.Bush.All, getBushesOptions);

  instance.get<{
    Params: {
      id: string;
    };
  }>(APIRoute.Bush.Info, getBushOptions);

  instance.post<{
    Body: Bush;
  }>(APIRoute.Bush.Create, createBushOptions);

  instance.put<{
    Body: Bush;
  }>(APIRoute.Bush.Update, updateBushOptions);

  instance.delete<{
    Params: {
      id: string;
    };
  }>(APIRoute.Bush.Delete, deleteBushOptions);

  done();
};
