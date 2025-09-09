import { createRouteSchema } from "../common-schemas.js";

const tags = ["group"];
const GroupSchema = { $ref: "group" };
const GroupInfoSchema = { $ref: "groupInfo" };

const getGroupsSchema = createRouteSchema({
  tags,
  querystring: { $ref: "querystring" },
  response: {
    200: {
      type: "array",
      items: GroupSchema,
    },
  },
});

const getGroupSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: GroupInfoSchema,
    404: { $ref: "notFoundSchema" },
  },
});

const createGroupSchema = createRouteSchema({
  tags,
  body: GroupSchema,
  response: {
    200: {
      type: "string",
    },
  },
});

const updateGroupSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  body: GroupSchema,
  response: {
    200: GroupSchema,
  },
});

const deleteGroupSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: {
      type: "string",
    },
  },
});

export {
  createGroupSchema,
  deleteGroupSchema,
  getGroupSchema,
  getGroupsSchema,
  updateGroupSchema,
};
