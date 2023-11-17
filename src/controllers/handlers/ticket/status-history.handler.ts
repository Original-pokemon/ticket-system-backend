import statusHistoryRepository from "#root/repositories/ticket/status-history.repository.js";
import { StatusHistory } from "@prisma/client";
import {
  createResourceHandler,
  deleteResourceHandler,
  getResourceHandler,
  updateResourceHandler,
  getResourcesHandler,
} from "../common-resource-handler.js";

const statusHistoryResource = {
  getAll: statusHistoryRepository.getAll,
  getUnique: statusHistoryRepository.getUnique,
  create: statusHistoryRepository.create,
  update: statusHistoryRepository.update,
  delete: statusHistoryRepository.delete,
  name: "statusHistory",
};

export const getStatusHistoriesHandler = getResourcesHandler<string>(
  statusHistoryResource,
);
export const getStatusHistoryHandler = getResourceHandler<string>(
  statusHistoryResource,
);
export const createStatusHistoryHandler = createResourceHandler<
  string,
  StatusHistory
>(statusHistoryResource);
export const updateStatusHistoryHandler = updateResourceHandler<
  string,
  StatusHistory
>(statusHistoryResource);
export const deleteStatusHistoryHandler = deleteResourceHandler<string>(
  statusHistoryResource,
);
