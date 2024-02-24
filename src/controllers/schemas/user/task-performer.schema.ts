import { createRouteSchema } from "../common-schemas.js";

const tags = ["task-performer"];
const taskPerformerSchema = { $ref: "taskPerformer" };
const taskPerformerInfoSchema = { $ref: "taskPerformerInfo" };

const getTaskPerformersSchema = createRouteSchema({
  tags,
  querystring: { $ref: "querystring" },
  response: {
    200: {
      type: "array",
      items: taskPerformerSchema,
    },
  },
});

const getTaskPerformerSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: taskPerformerInfoSchema,
    404: { $ref: "notFoundSchema" },
  },
});

const createTaskPerformerSchema = createRouteSchema({
  tags,
  body: taskPerformerSchema,
  response: {
    200: {
      type: "string",
    },
  },
});

const updateTaskPerformerSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  body: taskPerformerSchema,
  response: {
    200: taskPerformerSchema,
  },
});

const deleteTaskPerformerSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: { type: "string" },
    404: { $ref: "notFoundSchema" },
  },
});

export {
  getTaskPerformerSchema,
  getTaskPerformersSchema,
  createTaskPerformerSchema,
  deleteTaskPerformerSchema,
  updateTaskPerformerSchema,
};
