import { createRouteSchema } from "../common-schemas.js";

const tags = ["tagWord"];
const tagWordSchema = { $ref: "tagWord" };

const getTagWordsSchema = createRouteSchema({
  tags,
  querystring: { $ref: "querystring" },
  response: {
    200: {
      type: "array",
      items: tagWordSchema,
    },
  },
});

const getTagWordSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: tagWordSchema,
    404: { $ref: "notFoundSchema" },
  },
});

const createTagWordSchema = createRouteSchema({
  tags,
  body: tagWordSchema,
  response: {
    200: {
      type: "string",
    },
  },
});

const updateTagWordSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  body: tagWordSchema,
  response: {
    200: tagWordSchema,
  },
});

const deleteTagWordSchema = createRouteSchema({
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
  createTagWordSchema,
  deleteTagWordSchema,
  getTagWordSchema,
  getTagWordsSchema,
  updateTagWordSchema,
};
