import { Priority } from "@prisma/client";
import PriorityRepository from "#root/repositories/ticket/priority.repository.js";
import {
  createResourceHandler,
  deleteResourceHandler,
  getResourceHandler,
  updateResourceHandler,
  getResourcesHandler,
} from "../common-resource-handler.js";

const priorityResource = {
  getAll: PriorityRepository.getAll,
  getUnique: PriorityRepository.getUnique,
  create: PriorityRepository.create,
  update: PriorityRepository.update,
  delete: PriorityRepository.delete,
  name: "priority",
};

export const getPrioritiesHandler = getResourcesHandler(priorityResource);
export const getPriorityHandler = getResourceHandler(priorityResource);
export const createPriorityHandler =
  createResourceHandler<Priority>(priorityResource);
export const updatePriorityHandler =
  updateResourceHandler<Priority>(priorityResource);
export const deletePriorityHandler = deleteResourceHandler(priorityResource);
