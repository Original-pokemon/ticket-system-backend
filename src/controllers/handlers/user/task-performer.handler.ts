import taskPerformerRepository from "#root/repositories/user/task-performer.repository.js";
import { TaskPerformer } from "@prisma/client";
import {
  createResourceHandler,
  deleteResourceHandler,
  getResourceHandler,
  updateResourceHandler,
  getResourcesHandler,
} from "../common-resource-handler.js";

const taskPerformerResource = {
  getAll: taskPerformerRepository.getAll,
  getUnique: taskPerformerRepository.getUnique,
  create: taskPerformerRepository.create,
  update: taskPerformerRepository.update,
  delete: taskPerformerRepository.delete,
  name: "taskPerformer",
};

export const getTaskPerformersHandler = getResourcesHandler<string>(
  taskPerformerResource,
);
export const getTaskPerformerHandler = getResourceHandler<string>(
  taskPerformerResource,
);
export const createTaskPerformerHandler = createResourceHandler<
  string,
  TaskPerformer
>(taskPerformerResource);
export const updateTaskPerformerHandler = updateResourceHandler<
  string,
  TaskPerformer
>(taskPerformerResource);
export const deleteTaskPerformerHandler = deleteResourceHandler<string>(
  taskPerformerResource,
);
