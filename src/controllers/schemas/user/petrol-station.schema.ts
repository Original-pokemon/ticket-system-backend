import { createRouteSchema } from "../common-schemas.js";

const tags = ["petrol-station"];
const petrolStationSchema = { $ref: "petrolStation" };
const petrolStationInfoSchema = { $ref: "petrolStationInfo" };

const getPetrolStationsSchema = createRouteSchema({
  tags,
  querystring: { $ref: "querystring" },
  response: {
    200: {
      type: "array",
      items: petrolStationSchema,
    },
  },
});

const getPetrolStationSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: petrolStationInfoSchema,
    404: { $ref: "notFoundSchema" },
  },
});

const createPetrolStationSchema = createRouteSchema({
  tags,
  body: { $ref: "petrolStation" },
  response: {
    200: {
      type: "string",
    },
  },
});

const updatePetrolStationSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  body: { $ref: "petrolStationInfo" },
  response: {
    200: {
      $ref: "petrolStationInfo",
    },
  },
});

const deletePetrolStationSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: { type: "string" },
  },
});

export {
  createPetrolStationSchema,
  getPetrolStationsSchema,
  getPetrolStationSchema,
  deletePetrolStationSchema,
  updatePetrolStationSchema,
};
