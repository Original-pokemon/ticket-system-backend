import petrolStationRepository from "#root/repositories/user/petrol-station.repository.js";
import { PetrolStation } from "@prisma/client";
import {
  createResourceHandler,
  deleteResourceHandler,
  getResourceHandler,
  updateResourceHandler,
  getResourcesHandler,
} from "../common-resource-handler.js";

const petrolStationResource = {
  getAll: petrolStationRepository.getAll,
  getUnique: petrolStationRepository.getUnique,
  create: petrolStationRepository.create,
  update: petrolStationRepository.update,
  delete: petrolStationRepository.delete,
  name: "petrolStation",
};

export const getPetrolStationsHandler = getResourcesHandler<string>(
  petrolStationResource,
);
export const getPetrolStationHandler = getResourceHandler<string>(
  petrolStationResource,
);
export const createPetrolStationHandler = createResourceHandler<
  string,
  PetrolStation
>(petrolStationResource);
export const updatePetrolStationHandler = updateResourceHandler<
  string,
  PetrolStation
>(petrolStationResource);
export const deletePetrolStationHandler = deleteResourceHandler<string>(
  petrolStationResource,
);
