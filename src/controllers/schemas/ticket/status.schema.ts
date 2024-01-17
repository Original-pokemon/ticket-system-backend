const Status = {
  type: "object",
  properties: {
    id: { type: "number" },
    description: { type: "string" },
  },
  required: ["description"],
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
    id: { type: "number" },
  },
  response: {
    200: Status,
  },
};

const createStatusSchema = {
  tags: ["status"],
  body: Status,
  response: {
    200: {
      type: "string",
    },
  },
};

const updateStatusSchema = {
  tags: ["status"],
  params: {
    id: { type: "number" },
  },
  body: Status,
  response: {
    200: Status,
  },
};

const deleteStatusSchema = {
  tags: ["status"],
  params: {
    id: { type: "number" },
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
