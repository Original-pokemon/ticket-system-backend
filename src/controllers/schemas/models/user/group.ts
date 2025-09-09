const GroupProperties = {
  id: { type: "string" },
  description: { type: "string" },
};

const GroupSchema = {
  $id: "group",
  type: "object",
  required: ["id", "description"],
  properties: GroupProperties,
};

const GroupInfoSchema = {
  $id: "groupInfo",
  type: "object",
  properties: {
    ...GroupProperties,
    users: {
      type: "array",
      items: { type: "string" },
    },
  },
};

export { GroupSchema, GroupInfoSchema };
