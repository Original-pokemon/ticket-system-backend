import { createRouteSchema } from "../common-schemas.js";

const tags = ["comment"];
const commentSchema = { $ref: "comment" };

const getCommentsSchema = createRouteSchema({
  tags,
  querystring: { $ref: "querystring" },
  response: {
    200: {
      type: "array",
      items: commentSchema,
    },
  },
});

const getCommentSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: commentSchema,
    404: { $ref: "notFoundSchema" },
  },
});

const createCommentSchema = createRouteSchema({
  tags,
  body: commentSchema,
  response: {
    200: {
      type: "string",
    },
  },
});

const updateCommentSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  body: commentSchema,
  response: {
    200: commentSchema,
  },
});

const deleteCommentSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: { type: "string" },
  },
});

export {
  createCommentSchema,
  deleteCommentSchema,
  getCommentSchema,
  getCommentsSchema,
  updateCommentSchema,
};
