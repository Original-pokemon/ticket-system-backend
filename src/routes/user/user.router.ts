import {
  createUserHandler,
  deleteUserHandler,
  getSelectUsersHandler,
  getUserHandler,
  getUsersHandler,
  updateUserHandler,
} from "#root/controllers/handlers/user/user.handler.js";
import {
  createUserSchema,
  deleteUserSchema,
  getSelectUsersSchema,
  getUserSchema,
  getUsersSchema,
  updateUserSchema,
} from "#root/controllers/schemas/user/user.schema.js";
import { FastifyPluginCallback } from "fastify";

import { User } from "@prisma/client";

import { APIRoute } from "./api-route.js";

const getUsersOptions = {
  schema: getUsersSchema,
  handler: getUsersHandler,
};

const getSelectUsersOptions = {
  schema: getSelectUsersSchema,
  handler: getSelectUsersHandler,
};

const getUserOptions = {
  schema: getUserSchema,
  handler: getUserHandler,
};

const createUserOptions = {
  schema: createUserSchema,
  handler: createUserHandler,
};

const updateUserOptions = {
  schema: updateUserSchema,
  handler: updateUserHandler,
};

const deleteUserOptions = {
  schema: deleteUserSchema,
  handler: deleteUserHandler,
};

export const userRouters: FastifyPluginCallback = (
  instance,
  _options,
  done,
) => {
  instance.get(APIRoute.Users.All, getUsersOptions);

  instance.get(APIRoute.Users.Many, getSelectUsersOptions);

  instance.get<{
    Params: {
      id: string;
    };
  }>(APIRoute.Users.Info, getUserOptions);

  instance.post<{
    Body: User;
  }>(APIRoute.Users.Create, createUserOptions);

  instance.put<{
    Body: User;
  }>(APIRoute.Users.Update, updateUserOptions);

  instance.delete<{
    Params: {
      id: string;
    };
  }>(APIRoute.Users.Delete, deleteUserOptions);

  done();
};
