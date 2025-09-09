const StatusProperties = {
  id: { type: "string" },
  description: { type: "string" },
};

const StatusSchema = {
  $id: "status",
  type: "object",
  properties: StatusProperties,
};

export { StatusSchema };
