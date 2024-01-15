export const User = {
  id: { type: "string" },
  user_name: { type: "string" },
  first_name: { type: "string" },
  last_name: { type: "string" },
  user_group: { type: "string" },
  created_at: { type: "string" },
};

const getUsersSchema = {
  tags: ["user"],
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

const getSelectUsersSchema = {
  tags: ["user"],
  body: {
    data: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
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
  tags: ["user"],
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
  tags: ["user"],
  body: {
    type: "object",
    required: ["id", "user_name", "first_name", "user_group"],
    properties: User,
  },
  response: {
    200: {
      type: "string",
    },
  },
};

const updateUserSchema = {
  tags: ["user"],
  params: {
    id: { type: "string" },
  },
  body: {
    type: "object",
    properties: User,
  },
  response: {
    200: {
      type: "object",
      properties: User,
    },
  },
};

const deleteUserSchema = {
  tags: ["user"],
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
  getSelectUsersSchema,
  getUsersSchema,
  updateUserSchema,
};
