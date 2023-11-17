const Group = {
  id: { type: "string" },
  description: { type: "string" },
};

const getGroupsSchema = {
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: Group,
      },
    },
  },
};

const getGroupSchema = {
  params: {
    id: { type: "string" },
  },
  response: {
    200: {
      type: "object",
      properties: Group,
    },
  },
};

const createGroupSchema = {
  body: {
    type: "object",
    required: ["id"],
    properties: Group,
  },
  response: {
    200: {
      type: "object",
      properties: Group,
    },
  },
};

const updateGroupSchema = {
  params: {
    id: { type: "string" },
  },
  body: {
    type: "object",
    properties: Group,
  },
  response: {
    200: {
      type: "object",
      properties: Group,
    },
  },
};

const deleteGroupSchema = {
  params: {
    id: { type: "string" },
  },
  response: {
    200: {
      type: "object",
      properties: Group,
    },
  },
};

export {
  createGroupSchema,
  deleteGroupSchema,
  getGroupSchema,
  getGroupsSchema,
  updateGroupSchema,
};
