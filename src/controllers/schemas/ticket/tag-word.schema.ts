const TagWord = {
  type: "object",
  properties: {
    id: {
      type: "string",
      description: "Уникальный идентификатор тега",
    },
    category_id: {
      type: "number",
      description: "Идентификатор категории, к которой относится тег",
    },
    priority_id: {
      type: "number",
      description: "Идентификатор приоритета тега",
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
      type: "string",
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
    200: {
      type: "string",
    },
  },
};

export {
  createTagWordSchema,
  deleteTagWordSchema,
  getTagWordSchema,
  getTagWordsSchema,
  updateTagWordSchema,
};
