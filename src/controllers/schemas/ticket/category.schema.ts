const Category = {
  type: "object",
  properties: {
    id: { type: "number" },
    description: { type: "string" },
  },
  required: ["id", "description"],
};

const getCategoriesSchema = {
  tags: ["category"],
  response: {
    200: {
      type: "array",
      items: Category,
    },
  },
};

const getCategorySchema = {
  tags: ["category"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: Category,
  },
};

const createCategorySchema = {
  tags: ["category"],
  body: Category,
  response: {
    200: Category,
  },
};

const updateCategorySchema = {
  tags: ["category"],
  params: {
    id: { type: "string" },
  },
  body: Category,
  response: {
    200: Category,
  },
};

const deleteCategorySchema = {
  tags: ["category"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: Category,
  },
};

export {
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  getCategoriesSchema,
  updateCategorySchema,
};
