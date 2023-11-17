import statusRepository from "#root/repositories/ticket/status.repository.js";
import { Status } from "@prisma/client";
import {
  createResourceHandler,
  deleteResourceHandler,
  getResourceHandler,
  updateResourceHandler,
  getResourcesHandler,
} from "../common-resource-handler.js";

const statusResource = {
  getAll: statusRepository.getAll,
  getUnique: statusRepository.getUnique,
  create: statusRepository.create,
  update: statusRepository.update,
  delete: statusRepository.delete,
  name: "status",
};

export const getStatusesHandler = getResourcesHandler<number>(statusResource);
export const getStatusHandler = getResourceHandler<number>(statusResource);
export const createStatusHandler = createResourceHandler<number, Status>(
  statusResource,
);
export const updateStatusHandler = updateResourceHandler<number, Status>(
  statusResource,
);
export const deleteStatusHandler =
  deleteResourceHandler<number>(statusResource);
