import { User } from "./user.schema.js";

const Manager = {
  user_id: { type: "string" },
  bush_id: { type: "number" },
};

const ManagerInfo = {
  ...Manager,
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
  user: { type: "object", properties: User },
};

const getManagersSchema = {
  tags: ["manager"],
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: { ...Manager, user: User },
      },
    },
  },
};

const getManagerSchema = {
  tags: ["manager"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: {
      type: "object",
      properties: ManagerInfo,
    },
  },
};

const createManagerSchema = {
  tags: ["manager"],
  body: {
    type: "object",
    required: ["user_id", "bush_id"],
    properties: Manager,
  },
  response: {
    200: {
      type: "string",
    },
  },
};

const updateManagerSchema = {
  tags: ["manager"],
  params: {
    id: { type: "string" },
  },
  body: {
    type: "object",
    properties: ManagerInfo,
  },
  response: {
    200: {
      type: "object",
      properties: ManagerInfo,
    },
  },
};

const deleteManagerSchema = {
  tags: ["manager"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: {
      type: "string",
    },
  },
};

export {
  getManagerSchema,
  getManagersSchema,
  updateManagerSchema,
  deleteManagerSchema,
  createManagerSchema,
};
