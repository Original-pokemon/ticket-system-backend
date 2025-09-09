import { createRouteSchema } from "../common-schemas.js";

const tags = ["user"];
const userSchema = { $ref: "user" };

const getUsersSchema = createRouteSchema({
  tags,
  querystring: { $ref: "querystring" },
  response: {
    200: {
      type: "array",
      items: userSchema,
    },
  },
});

const getUserSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: userSchema,
    404: { $ref: "notFoundSchema" },
  },
});

const createUserSchema = createRouteSchema({
  tags,
  body: userSchema,
  response: {
    200: { type: "string" },
  },
});

const updateUserSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  body: userSchema,
  response: {
    200: userSchema,
  },
});

const deleteUserSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    404: { $ref: "notFoundSchema" },
    200: userSchema,
  },
});

export {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  getUsersSchema,
  updateUserSchema,
};
