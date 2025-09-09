const ManagerProperties = {
  id: { type: "string" },
  bush_id: { type: "string" },
};

const ManagerSchema = {
  $id: "manager",
  type: "object",
  properties: {
    ...ManagerProperties,
    user: { $ref: "user" },
    petrol_stations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          bush_id: { type: "string" },
          tickets: { type: "array", items: { $ref: "ticket" } },
        },
      },
    },
  },
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
