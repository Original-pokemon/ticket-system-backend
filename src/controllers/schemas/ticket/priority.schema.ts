import { createRouteSchema } from "../common-schemas.js";

const tags = ["priority"];
const prioritySchema = { $ref: "priority" };

const getPrioritiesSchema = createRouteSchema({
  tags,
  querystring: { $ref: "querystring" },
  response: {
    200: {
      type: "array",
      items: prioritySchema,
    },
  },
});

const getPrioritySchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: prioritySchema,
    404: { $ref: "notFoundSchema" },
  },
});

const createPrioritySchema = createRouteSchema({
  tags,
  body: prioritySchema,
  response: {
    200: {
      type: "string",
    },
  },
});

const updatePrioritySchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  body: prioritySchema,
  response: {
    200: prioritySchema,
  },
});

const deletePrioritySchema = createRouteSchema({
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
  createPrioritySchema,
  deletePrioritySchema,
  getPrioritySchema,
  getPrioritiesSchema,
  updatePrioritySchema,
};
