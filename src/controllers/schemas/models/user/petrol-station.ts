const petrolStationsProperties = {
  id: { type: "string" },
  bush_id: { type: "string" },
};

const PetrolStationSchema = {
  $id: "petrolStation",
  title: "Petrol station",
  required: ["id", "bush_id"],
  type: "object",
  properties: {
    ...petrolStationsProperties,
    user: { $ref: "user" },
    tickets: { type: "array", items: { $ref: "ticket" } },
    managers: { type: "array", items: { $ref: "manager" } },
  },
};

const PetrolStationInfoSchema = {
  $id: "petrolStationInfo",
  title: "Petrol station full",
  type: "object",
  properties: {
    ...petrolStationsProperties,
    managers: {
      type: "array",
      items: {
        type: "string",
      },
    },
    tickets: {
      type: "array",
      items: { $ref: "ticket" },
    },
    user: { $ref: "user" },
  },
};

export { PetrolStationInfoSchema, PetrolStationSchema };
