const TagWordProperties = {
  id: {
    type: "string",
    description: "Уникальный идентификатор тега",
  },
  category_id: {
    type: "string",
    description: "Идентификатор категории, к которой относится тег",
  },
  priority_id: {
    type: "string",
    description: "Идентификатор приоритета тега",
  },
};

const TagWordSchema = {
  $id: "tagWord",
  type: "object",
  properties: TagWordProperties,
};

export { TagWordSchema };
