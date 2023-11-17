const Bush = {
  id: {
    type: "number",
  },
  description: {
    type: "string",
  },
};

const getBushesSchema = {
  tags: ["bush"],
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: Bush,
      },
    },
  },
};

const getBushSchema = {
  tags: ["bush"],
  params: {
    id: { type: "number" },
  },
  response: {
    200: {
      type: "object",
      properties: Bush,
    },
  },
};

const createBushSchema = {
  tags: ["bush"],
  body: {
    type: "object",
    required: ["description"],
    properties: Bush,
  },
  response: {
    200: {
      type: "object",
      properties: Bush,
    },
  },
};

const updateBushSchema = {
  tags: ["bush"],
  params: {
    id: { type: "number" },
  },
  body: {
    type: "object",
    properties: Bush,
  },
  response: {
    200: {
      type: "object",
      properties: Bush,
    },
  },
};

const deleteBushSchema = {
  tags: ["bush"],
  params: {
    id: { type: "number" },
  },
  response: {
    200: {
      type: "object",
      properties: Bush,
    },
  },
};

export {
  createBushSchema,
  deleteBushSchema,
  getBushSchema,
  getBushesSchema,
  updateBushSchema,
};
