import managerRepository from "#root/repositories/user/manager.repository.js";
import { Manager } from "@prisma/client";
import {
  createResourceHandler,
  deleteResourceHandler,
  getResourceHandler,
  updateResourceHandler,
  getResourcesHandler,
} from "../common-resource-handler.js";

const managerResource = {
  getAll: managerRepository.getAll,
  getUnique: managerRepository.getUnique,
  create: managerRepository.create,
  update: managerRepository.update,
  delete: managerRepository.delete,
  name: "manager",
};

export const getManagersHandler = getResourcesHandler<string>(managerResource);
export const getManagerHandler = getResourceHandler<string>(managerResource);
export const createManagerHandler = createResourceHandler<string, Manager>(
  managerResource,
);
export const updateManagerHandler = updateResourceHandler<string, Manager>(
  managerResource,
);
export const deleteManagerHandler =
  deleteResourceHandler<string>(managerResource);
