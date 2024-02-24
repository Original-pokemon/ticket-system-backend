import { createRouteSchema } from "../common-schemas.js";

const tags = ["status"];
const statusSchema = { $ref: "status" };

const getStatusesSchema = createRouteSchema({
  tags,
  querystring: { $ref: "querystring" },
  response: {
    200: {
      type: "array",
      items: statusSchema,
    },
  },
});

const getStatusSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: statusSchema,
    404: { $ref: "notFoundSchema" },
  },
});

const createStatusSchema = createRouteSchema({
  tags,
  body: statusSchema,
  response: {
    200: {
      type: "string",
    },
  },
});

const updateStatusSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  body: statusSchema,
  response: {
    200: statusSchema,
  },
});

const deleteStatusSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: { type: "string" },
  },
});

export {
  createStatusSchema,
  deleteStatusSchema,
  getStatusSchema,
  getStatusesSchema,
  updateStatusSchema,
};
