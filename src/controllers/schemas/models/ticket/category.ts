const CategoryProperties = {
  id: { type: "string" },
  description: { type: "string" },
  task_performers: {
    type: "array",
    items: {
      type: "string",
    },
  },
};

const CategorySchema = {
  $id: "category",
  type: "object",
  properties: CategoryProperties,
};

export { CategorySchema };
