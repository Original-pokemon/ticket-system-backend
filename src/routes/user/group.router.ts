import {
  createGroupHandler,
  deleteGroupHandler,
  getGroupHandler,
  getGroupsHandler,
  updateGroupHandler,
} from '#root/controllers/handlers/user/group.handler.js';
import {
  createGroupSchema,
  deleteGroupSchema,
  getGroupSchema,
  getGroupsSchema,
  updateGroupSchema,
} from '#root/controllers/schemas/user/group.schema.js';
import { GroupType } from '#root/types/user.js';
import { FastifyPluginCallback } from 'fastify';

const getGroupsOptions = {
  schema: getGroupsSchema,
  handler: getGroupsHandler,
};

const getGroupOptions = {
  schema: getGroupSchema,
  handler: getGroupHandler,
};

const createGroupOptions = {
  schema: createGroupSchema,
  handler: createGroupHandler,
};

const updateGroupOptions = {
  schema: updateGroupSchema,
  handler: updateGroupHandler,
};

const deleteGroupOptions = {
  schema: deleteGroupSchema,
  handler: deleteGroupHandler,
};

const groupRouters: FastifyPluginCallback = (instance, _options, done) => {
  instance.get("/groups", getGroupsOptions);

  instance.get<{
    Params: {
      id: string;
    };
  }>("/group/:id", getGroupOptions);

  instance.post<{
    Body: GroupType;
  }>("/group/create", createGroupOptions);

  instance.put<{
    Body: GroupType;
  }>("/group/update/:id", updateGroupOptions);

  instance.delete<{
    Params: {
      id: string;
    };
  }>("/group/delete/:id", deleteGroupOptions);

  done();
};

export default groupRouters;
