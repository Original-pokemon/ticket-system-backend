import userRepository from "#root/repositories/user/user.repository.js";
import { User } from "@prisma/client";
import {
  createResourceHandler,
  deleteResourceHandler,
  getResourceHandler,
  updateResourceHandler,
  getResourcesHandler,
} from "../common-resource-handler.js";

const userResource = {
  getAll: userRepository.getAll,
  getUnique: userRepository.getUnique,
  create: userRepository.create,
  update: userRepository.update,
  delete: userRepository.delete,
  name: "user",
};

export const getUsersHandler = getResourcesHandler<string>(userResource);
export const getUserHandler = getResourceHandler<string>(userResource);
export const createUserHandler = createResourceHandler<string, User>(
  userResource,
);
export const updateUserHandler = updateResourceHandler<string, User>(
  userResource,
);
export const deleteUserHandler = deleteResourceHandler<string>(userResource);
