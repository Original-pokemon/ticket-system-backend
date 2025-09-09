import {
  createGroupHandler,
  deleteGroupHandler,
  getGroupHandler,
  getGroupsHandler,
  updateGroupHandler,
} from "#root/controllers/handlers/user/group.handler.js";
import {
  createGroupSchema,
  deleteGroupSchema,
  getGroupSchema,
  getGroupsSchema,
  updateGroupSchema,
} from "#root/controllers/schemas/user/group.schema.js";
import { FastifyPluginCallback } from "fastify/types/plugin.js";

import { Group } from "@prisma/client";

import { APIRoute } from "./api-route.js";

const getGroupsOptions = {
  schema: getGroupsSchema,
  handler: getGroupsHandler,
};

const getGroupOptions = {
  schema: getGroupSchema,
  handler: getGroupHandler,
};

const createGroupOptions = {
  schema: createGroupSchema,
  handler: createGroupHandler,
};

const updateGroupOptions = {
  schema: updateGroupSchema,
  handler: updateGroupHandler,
};

const deleteGroupOptions = {
  schema: deleteGroupSchema,
  handler: deleteGroupHandler,
};

export const groupRouters: FastifyPluginCallback = (
  instance,
  _options,
  done,
) => {
  instance.get(APIRoute.Groups.All, getGroupsOptions);

  instance.get<{
    Params: {
      id: string;
    };
  }>(APIRoute.Groups.Info, getGroupOptions);

  instance.post<{
    Body: Group;
  }>(APIRoute.Groups.Create, createGroupOptions);

  instance.put<{
    Body: Group;
  }>(APIRoute.Groups.Update, updateGroupOptions);

  instance.delete<{
    Params: {
      id: string;
    };
  }>(APIRoute.Groups.Delete, deleteGroupOptions);

  done();
};
