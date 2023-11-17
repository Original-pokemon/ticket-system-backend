import { Bush } from "@prisma/client";
import BushRepository from "#root/repositories/user/bush.repository.js";
import {
  createResourceHandler,
  deleteResourceHandler,
  getResourceHandler,
  updateResourceHandler,
  getResourcesHandler,
} from "../common-resource-handler.js";

const bushResource = {
  getAll: BushRepository.getAll,
  getUnique: BushRepository.getUnique,
  create: BushRepository.create,
  update: BushRepository.update,
  delete: BushRepository.delete,
  name: "bush",
};

export const getBushesHandler = getResourcesHandler<number>(bushResource);
export const getBushHandler = getResourceHandler<number>(bushResource);
export const createBushHandler = createResourceHandler<number, Bush>(
  bushResource,
);
export const updateBushHandler = updateResourceHandler<number, Bush>(
  bushResource,
);
export const deleteBushHandler = deleteResourceHandler<number>(bushResource);
