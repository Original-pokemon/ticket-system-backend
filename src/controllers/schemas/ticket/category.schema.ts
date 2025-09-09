import { createRouteSchema } from "../common-schemas.js";

const tags = ["category"];
const categorySchema = { $ref: "category" };

const getCategoriesSchema = createRouteSchema({
  tags,
  querystring: { $ref: "querystring" },
  response: {
    200: {
      type: "array",
      items: categorySchema,
    },
    404: { $ref: "notFoundSchema" },
  },
});

const getCategorySchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: categorySchema,
    404: { $ref: "notFoundSchema" },
  },
});

const createCategorySchema = createRouteSchema({
  tags,
  body: categorySchema,
  response: {
    200: {
      type: "string",
    },
  },
});

const updateCategorySchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  body: categorySchema,
  response: {
    200: categorySchema,
  },
});

const deleteCategorySchema = createRouteSchema({
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
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  getCategoriesSchema,
  updateCategorySchema,
};
