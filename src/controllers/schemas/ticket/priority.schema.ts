const Priority = {
  type: "object",
  properties: {
    id: { type: "number" },
    description: { type: "string" },
  },
  required: ["id", "description"],
};

const getPrioritiesSchema = {
  tags: ["priority"],
  response: {
    200: {
      type: "array",
      items: Priority,
    },
  },
};

const getPrioritySchema = {
  tags: ["priority"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: Priority,
  },
};

const createPrioritySchema = {
  tags: ["priority"],
  body: {
    type: "object",
    required: ["id"],
    properties: Priority,
  },
  response: {
    200: Priority,
  },
};

const updatePrioritySchema = {
  tags: ["priority"],
  params: {
    id: { type: "string" },
  },
  body: Priority,
  response: {
    200: Priority,
  },
};

const deletePrioritySchema = {
  tags: ["priority"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: Priority,
  },
};

export {
  createPrioritySchema,
  deletePrioritySchema,
  getPrioritySchema,
  getPrioritiesSchema,
  updatePrioritySchema,
};
