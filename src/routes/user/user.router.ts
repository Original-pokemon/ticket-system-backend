import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
  updateUserHandler,
} from '#root/controllers/handlers/user/user.handler.js';
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  getUsersSchema,
  updateUserSchema,
} from '#root/controllers/schemas/user/user.schema.js';
import { UserType } from '#root/types/user.js';
import { FastifyPluginCallback } from 'fastify';

const getUsersOptions = {
  schema: getUsersSchema,
  handler: getUsersHandler,
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

const userRouters: FastifyPluginCallback = (instance, _options, done) => {
  instance.get("/users", getUsersOptions);

  instance.get<{
    Params: {
      id: string;
    };
  }>("/user/:id", getUserOptions);

  instance.post<{
    Body: UserType;
  }>("/user/create", createUserOptions);

  instance.put<{
    Body: UserType;
  }>("/user/update/:id", updateUserOptions);

  instance.delete<{
    Body: UserType;
  }>("/user/delete/:id", deleteUserOptions);

  done();
};

export default userRouters;
