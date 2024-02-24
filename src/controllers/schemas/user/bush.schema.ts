import { createRouteSchema, querystringObject } from "../common-schemas.js";
import { querystringId } from "../models/index.js";

const tags = ["bush"];
const bushSchema = { $ref: "bush" };

const getBushesSchema = createRouteSchema({
  tags,
  querystring: { $ref: querystringId },
  response: {
    200: {
      type: "array",
      items: bushSchema,
    },
  },
});

const getBushSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: bushSchema,
    404: { $ref: "notFoundSchema" },
  },
});

const createBushSchema = createRouteSchema({
  tags,
  body: bushSchema,
  response: {
    200: {
      type: "string",
    },
  },
});

const updateBushSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  body: bushSchema,
  response: {
    200: bushSchema,
  },
});

const deleteBushSchema = createRouteSchema({
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
  createBushSchema,
  deleteBushSchema,
  getBushSchema,
  getBushesSchema,
  updateBushSchema,
};
