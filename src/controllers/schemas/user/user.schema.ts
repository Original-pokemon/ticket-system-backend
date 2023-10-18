const User = {
  id: { type: "string" },
  user_name: { type: "string" },
  first_name: { type: "string" },
  last_name: { type: "string" },
  user_group: { type: "string" },
  created_at: { type: "string" },
};

const NewUser = {
  id: { type: "string" },
  user_name: { type: "string" },
  first_name: { type: "string" },
  last_name: { type: "string" },
  user_group: { type: "string" },
};

const getUsersSchema = {
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: User,
      },
    },
  },
};

const getUserSchema = {
  params: {
    id: { type: "string" },
  },
  response: {
    200: {
      type: "object",
      properties: User,
    },
  },
};

const createUserSchema = {
  body: {
    type: "object",
    required: ["id", "user_name", "first_name", "user_group"],
    properties: NewUser,
  },
  response: {
    200: {
      type: "object",
      properties: User,
    },
  },
};

const updateUserSchema = {
  params: {
    id: { type: "string" },
  },
  body: {
    type: "object",
    properties: NewUser,
  },
  response: {
    200: {
      type: "object",
      properties: User,
    },
  },
};

const deleteUserSchema = {
  params: {
    id: { type: "string" },
  },
  response: {
    200: {
      type: "object",
      properties: User,
    },
  },
};

export {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  getUsersSchema,
  updateUserSchema,
};
