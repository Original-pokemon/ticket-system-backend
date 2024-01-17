const Group = {
  id: { type: "string" },
  description: { type: "string" },
};

const getGroupsSchema = {
  tags: ["group"],
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
  tags: ["group"],
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
  tags: ["group"],
  body: {
    type: "object",
    required: ["id"],
    properties: Group,
  },
  response: {
    200: {
      type: "string",
    },
  },
};

const updateGroupSchema = {
  tags: ["group"],
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
  tags: ["group"],
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
