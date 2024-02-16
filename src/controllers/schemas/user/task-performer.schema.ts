const TaskPerformer = {
  user_id: { type: "string" },
  bush_id: { type: "number" },
  category_id: { type: ["number", "null"] },
  tickets: { type: "array", items: { type: "string" } },
};

const getTaskPerformersSchema = {
  tags: ["task-performer"],
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: TaskPerformer,
      },
    },
  },
};

const getTaskPerformerSchema = {
  tags: ["task-performer"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: {
      type: "object",
      properties: TaskPerformer,
    },
  },
};

const createTaskPerformerSchema = {
  tags: ["task-performer"],
  body: {
    type: "object",
    required: ["user_id", "bush_id"],
    properties: TaskPerformer,
  },
  response: {
    200: {
      type: "string",
    },
  },
};

const updateTaskPerformerSchema = {
  tags: ["task-performer"],
  params: {
    id: { type: "string" },
  },
  body: {
    type: "object",
    properties: TaskPerformer,
  },
  response: {
    200: {
      type: "object",
      properties: TaskPerformer,
    },
  },
};

const deleteTaskPerformerSchema = {
  tags: ["task-performer"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: { type: "string" },
  },
};

export {
  getTaskPerformerSchema,
  getTaskPerformersSchema,
  createTaskPerformerSchema,
  deleteTaskPerformerSchema,
  updateTaskPerformerSchema,
};
