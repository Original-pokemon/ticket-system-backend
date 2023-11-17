import { User } from "./user.schema.js";

const PetrolStation = {
  user_id: { type: "string" },
  bush_id: { type: "number" },
};

const PetrolStationWithManager = {
  ...PetrolStation,
  managers: {
    type: "array",
    items: { type: "string" },
  },
};

const PetrolStationWithUser = {
  ...PetrolStation,
  user: { type: "object", properties: User },
};

const FullPetrolStation = {
  ...PetrolStation,
  managers: {
    type: "array",
    items: {
      type: "string",
    },
  },
  user: { type: "object", properties: User },
};

const getPetrolStationsSchema = {
  tags: ["petrol-station"],
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: PetrolStationWithUser,
      },
    },
  },
};

const getPetrolStationSchema = {
  tags: ["petrol-station"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: {
      type: "object",
      properties: FullPetrolStation,
    },
  },
};

const createPetrolStationSchema = {
  tags: ["petrol-station"],
  body: {
    type: "object",
    required: ["user_id", "bush_id"],
    properties: PetrolStation,
  },
  response: {
    200: {
      type: "object",
      properties: PetrolStation,
    },
  },
};

const updatePetrolStationSchema = {
  tags: ["petrol-station"],
  params: {
    id: { type: "string" },
  },
  body: {
    type: "object",
    properties: PetrolStationWithManager,
  },
  response: {
    200: {
      type: "object",
      properties: PetrolStation,
    },
  },
};

const deletePetrolStationSchema = {
  tags: ["petrol-station"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: {
      type: "object",
      properties: PetrolStation,
    },
  },
};

export {
  createPetrolStationSchema,
  getPetrolStationsSchema,
  getPetrolStationSchema,
  deletePetrolStationSchema,
  updatePetrolStationSchema,
};
