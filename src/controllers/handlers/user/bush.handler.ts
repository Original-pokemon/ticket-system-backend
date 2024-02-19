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

export const getBushesHandler = getResourcesHandler(bushResource);
export const getBushHandler = getResourceHandler(bushResource);
export const createBushHandler = createResourceHandler<Bush>(bushResource);
export const updateBushHandler = updateResourceHandler<Bush>(bushResource);
export const deleteBushHandler = deleteResourceHandler(bushResource);
