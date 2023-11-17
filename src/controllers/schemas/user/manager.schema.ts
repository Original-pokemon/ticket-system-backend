import { User } from "./user.schema.js";

const Manager = {
  user_id: { type: "string" },
  bush_id: { type: "number" },
};

const ManagerWithPetrolStation = {
  ...Manager,
  petrol_stations: {
    type: "array",
    items: { type: "string" },
  },
};

const ManagerWithUser = {
  ...Manager,
  user: { type: "object", properties: User },
};

const FullManager = {
  ...Manager,
  petrol_stations: {
    type: "array",
    items: { type: "string" },
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
        properties: ManagerWithUser,
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
      properties: FullManager,
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
      type: "object",
      properties: Manager,
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
    properties: ManagerWithPetrolStation,
  },
  response: {
    200: {
      type: "object",
      properties: Manager,
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
      type: "object",
      properties: Manager,
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
