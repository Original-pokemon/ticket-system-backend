const ManagerProperties = {
  id: { type: "string" },
  bush_id: { type: "string" },
  user: { $ref: "user" },
};

const ManagerSchema = {
  $id: "manager",
  type: "object",
  properties: ManagerProperties,
};

const ManagerInfoSchema = {
  $id: "managerInfo",
  type: "object",
  properties: {
    ...ManagerProperties,
    tickets: {
      type: "array",
      items: {
        type: "object",
        properties: {
          petrol_station: { type: "string" },
          tickets: { type: "array", items: { type: "string" } },
        },
      },
    },
    petrol_stations: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
};

export { ManagerInfoSchema, ManagerSchema };
