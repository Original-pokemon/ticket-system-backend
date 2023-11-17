const Status = {
  type: "object",
  properties: {
    id: { type: "number" },
    description: { type: "string" },
  },
  required: ["id", "description"],
  additionalProperties: false,
};

const getStatusesSchema = {
  tags: ["status"],
  response: {
    200: {
      type: "array",
      items: Status,
    },
  },
};

const getStatusSchema = {
  tags: ["status"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: Status,
  },
};

const createStatusSchema = {
  tags: ["status"],
  body: {
    type: "object",
    required: ["id"],
    properties: Status,
  },
  response: {
    200: Status,
  },
};

const updateStatusSchema = {
  tags: ["status"],
  params: {
    id: { type: "string" },
  },
  body: Status,
  response: {
    200: Status,
  },
};

const deleteStatusSchema = {
  tags: ["status"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: Status,
  },
};

export {
  createStatusSchema,
  deleteStatusSchema,
  getStatusSchema,
  getStatusesSchema,
  updateStatusSchema,
};
