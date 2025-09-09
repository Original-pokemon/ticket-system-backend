import { createRouteSchema } from "../common-schemas.js";

const tags = ["status-history"];
const statusHistorySchema = { $ref: "statusHistory" };

const getStatusHistoriesSchema = createRouteSchema({
  tags,
  querystring: { $ref: "querystring" },
  response: {
    200: {
      type: "array",
      items: statusHistorySchema,
    },
  },
});

const getStatusHistorySchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: statusHistorySchema,
    404: { $ref: "notFoundSchema" },
  },
});

const createStatusHistorySchema = createRouteSchema({
  tags,
  body: statusHistorySchema,
  response: {
    200: {
      type: "string",
    },
  },
});

const updateStatusHistorySchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  body: statusHistorySchema,
  response: {
    200: statusHistorySchema,
  },
});

const deleteStatusHistorySchema = createRouteSchema({
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
  createStatusHistorySchema,
  deleteStatusHistorySchema,
  getStatusHistorySchema,
  getStatusHistoriesSchema,
  updateStatusHistorySchema,
};
