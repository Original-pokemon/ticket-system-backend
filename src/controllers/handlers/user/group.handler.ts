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

export const getGroupsHandler = getResourcesHandler(groupResource);
export const getGroupHandler = getResourceHandler(groupResource);
export const createGroupHandler = createResourceHandler<Group>(groupResource);
export const updateGroupHandler = updateResourceHandler<Group>(groupResource);
export const deleteGroupHandler = deleteResourceHandler(groupResource);
