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

export { GroupSchema };
