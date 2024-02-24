const PriorityProperties = {
  id: { type: "string" },
  description: { type: "string" },
};

const PrioritySchema = {
  $id: "priority",
  type: "object",
  properties: PriorityProperties,
};

export { PrioritySchema };
