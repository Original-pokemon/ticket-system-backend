const petrolStationsProperties = {
  id: { type: "string" },
  bush_id: { type: "string" },
  user: { $ref: "user" },
};

const PetrolStationSchema = {
  $id: "petrolStation",
  title: "Petrol station",
  required: ["id", "bush_id"],
  type: "object",
  properties: petrolStationsProperties,
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
      items: { type: "string" },
    },
    user: { $ref: "user" },
  },
};

export { PetrolStationInfoSchema, PetrolStationSchema };
