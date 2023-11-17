import {
  createPetrolStationHandler,
  deletePetrolStationHandler,
  getPetrolStationHandler,
  getPetrolStationsHandler,
  updatePetrolStationHandler,
} from "#root/controllers/handlers/user/petrol-station.handler.js";
import {
  createPetrolStationSchema,
  deletePetrolStationSchema,
  getPetrolStationSchema,
  getPetrolStationsSchema,
  updatePetrolStationSchema,
} from "#root/controllers/schemas/user/petrol-station.schema.js";
import { FastifyPluginCallback } from "fastify";

import { PetrolStation } from "@prisma/client";

import { APIRoute } from "./api-route.js";

const getPetrolStationsOptions = {
  schema: getPetrolStationsSchema,
  handler: getPetrolStationsHandler,
};

const getPetrolStationOptions = {
  schema: getPetrolStationSchema,
  handler: getPetrolStationHandler,
};

const createPetrolStationOptions = {
  schema: createPetrolStationSchema,
  handler: createPetrolStationHandler,
};

const updatePetrolStationOptions = {
  schema: updatePetrolStationSchema,
  handler: updatePetrolStationHandler,
};

const deletePetrolStationOptions = {
  schema: deletePetrolStationSchema,
  handler: deletePetrolStationHandler,
};

export const petrolStationRouters: FastifyPluginCallback = (
  instance,
  _options,
  done,
) => {
  instance.get(APIRoute.PetrolStation.All, getPetrolStationsOptions);

  instance.get<{
    Params: {
      id: string;
    };
  }>(APIRoute.PetrolStation.Info, getPetrolStationOptions);

  instance.post<{
    Body: PetrolStation;
  }>(APIRoute.PetrolStation.Create, createPetrolStationOptions);

  instance.put<{
    Body: PetrolStation & { managers: string[] };
  }>(APIRoute.PetrolStation.Update, updatePetrolStationOptions);

  instance.delete<{
    Params: {
      id: string;
    };
  }>(APIRoute.PetrolStation.Delete, deletePetrolStationOptions);

  done();
};
