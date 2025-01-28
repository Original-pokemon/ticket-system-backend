const taskPerformerProperties = {
  id: { type: "string" },
  bush_id: { type: "string" },
  category_id: { type: ["string", "null"] },
  user: { $ref: "user" },
};

const taskPerformerSchema = {
  $id: "taskPerformer",
  title: "Task performer profile",
  required: ["id", "bush_id"],
  type: "object",
  properties: taskPerformerProperties,
};

const taskPerformerInfoSchema = {
  $id: "taskPerformerInfo",
  tags: ["task-performer"],
  title: "Task performer profile with ticket",
  required: ["id", "bush_id"],
  type: "object",
  properties: {
    ...taskPerformerProperties,
    tickets: { type: "array", items: { $ref: "ticket" } },
  },
};

export { taskPerformerSchema, taskPerformerInfoSchema };
