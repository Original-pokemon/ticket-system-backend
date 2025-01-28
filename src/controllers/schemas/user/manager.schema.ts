import { createRouteSchema } from "../common-schemas.js";

const tags = ["manager"];
const managerSchema = { $ref: "manager" };
const managerInfoSchema = { $ref: "managerInfo" };

const getManagersSchema = createRouteSchema({
  tags,
  querystring: { $ref: "querystring" },
  response: {
    200: { type: "array", items: managerSchema },
  },
});

const getManagerSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: managerSchema,
    404: { $ref: "notFoundSchema" },
  },
});

const createManagerSchema = createRouteSchema({
  tags,
  body: managerSchema,
  response: {
    200: {
      type: "string",
    },
  },
});

const updateManagerSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  body: managerInfoSchema,
  response: {
    200: managerInfoSchema,
  },
});

const deleteManagerSchema = createRouteSchema({
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
  getManagerSchema,
  getManagersSchema,
  updateManagerSchema,
  deleteManagerSchema,
  createManagerSchema,
};
