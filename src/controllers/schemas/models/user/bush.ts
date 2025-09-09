const BushProperties = {
  id: { type: "string" },
  description: { type: "string" },
};

const BushSchema = {
  $id: "bush",
  type: "object",
  required: ["id", "description"],
  properties: BushProperties,
};

export { BushSchema };
