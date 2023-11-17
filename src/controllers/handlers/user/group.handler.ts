import groupRepository from "#root/repositories/user/group.repository.js";
import { Group } from "@prisma/client";
import {
  createResourceHandler,
  deleteResourceHandler,
  getResourceHandler,
  updateResourceHandler,
  getResourcesHandler,
} from "../common-resource-handler.js";

const groupResource = {
  getAll: groupRepository.getAll,
  getUnique: groupRepository.getUnique,
  create: groupRepository.create,
  update: groupRepository.update,
  delete: groupRepository.delete,
  name: "group",
};

export const getGroupsHandler = getResourcesHandler<string>(groupResource);
export const getGroupHandler = getResourceHandler<string>(groupResource);
export const createGroupHandler = createResourceHandler<string, Group>(
  groupResource,
);
export const updateGroupHandler = updateResourceHandler<string, Group>(
  groupResource,
);
export const deleteGroupHandler = deleteResourceHandler<string>(groupResource);
