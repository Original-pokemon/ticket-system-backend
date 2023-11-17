const TagWord = {
  type: "object",
  properties: {
    id: {
      type: "string",
      description: "Уникальный идентификатор тега",
      example: "abc123",
    },
    category_id: {
      type: "number",
      description: "Идентификатор категории, к которой относится тег",
      example: 1,
    },
    priority_id: {
      type: "number",
      description: "Идентификатор приоритета тега",
      example: 2,
    },
  },
  required: ["id", "category_id", "priority_id"],
  additionalProperties: false,
};

const getTagWordsSchema = {
  tags: ["tagWord"],
  response: {
    200: {
      type: "array",
      items: TagWord,
    },
  },
};

const getTagWordSchema = {
  tags: ["tagWord"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: TagWord,
  },
};

const createTagWordSchema = {
  tags: ["tagWord"],
  body: TagWord,
  response: {
    200: {
      type: "object",
      properties: TagWord,
    },
  },
};

const updateTagWordSchema = {
  tags: ["tagWord"],
  params: {
    id: { type: "string" },
  },
  body: TagWord,
  response: {
    200: TagWord,
  },
};

const deleteTagWordSchema = {
  tags: ["tagWord"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: TagWord,
  },
};

export {
  createTagWordSchema,
  deleteTagWordSchema,
  getTagWordSchema,
  getTagWordsSchema,
  updateTagWordSchema,
};
