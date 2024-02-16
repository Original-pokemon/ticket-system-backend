const Priority = {
  type: "object",
  properties: {
    id: { type: "number" },
    description: { type: "string" },
  },
  required: ["description"],
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
    id: { type: "number" },
  },
  response: {
    200: Priority,
  },
};

const createPrioritySchema = {
  tags: ["priority"],
  body: Priority,
  response: {
    200: {
      type: "string",
    },
  },
};

const updatePrioritySchema = {
  tags: ["priority"],
  params: {
    id: { type: "number" },
  },
  body: Priority,
  response: {
    200: Priority,
  },
};

const deletePrioritySchema = {
  tags: ["priority"],
  params: {
    id: { type: "number" },
  },
  response: {
    200: {
      type: "string",
    },
  },
};

export {
  createPrioritySchema,
  deletePrioritySchema,
  getPrioritySchema,
  getPrioritiesSchema,
  updatePrioritySchema,
};
