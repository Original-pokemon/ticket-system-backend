import { PetrolStation } from "@prisma/client";
import { getAllProperties } from "#root/types.js";
import getPropertiesGetAll from "#root/helpers/get-properties-get-all.js";
import Repository from "../repository.js";

class PetrolStationRepository extends Repository {
  create = async (petrolStation: PetrolStation): Promise<string> => {
    const { id } = await this.client.petrolStation.create({
      data: petrolStation,
    });
    return id;
  };

  getAll = async (properties: getAllProperties) => {
    const result = await this.client.petrolStation.findManyAndCount(
      getPropertiesGetAll(properties, {
        tickets: true,
        managers: true,
        user: true,
      }),
    );

    return result;
  };

  getUnique = async (id: string) => {
    const petrolStation = await this.client.petrolStation.findUnique({
      where: {
        id,
      },
      include: {
        tickets: true,
        managers: {
          select: {
            id: true,
          },
        },
        user: true,
      },
    });

    if (petrolStation) {
      const managers = petrolStation?.managers.map((item) => item.id);
      return { ...petrolStation, managers };
    }

    return petrolStation;
  };

  update = async ({ id, ...data }: PetrolStation & { managers: string[] }) => {
    const { managers } = data;
    const managersObject = managers.map((manager) => ({
      id: manager,
    }));

    await this.client.petrolStation.update({
      data: {
        managers: {
          set: [],
        },
      },
      where: { id },
    });

    const updatePetrolStation = await this.client.petrolStation.update({
      where: { id },
      data: {
        managers: {
          connect: managersObject,
        },
      },
      include: {
        managers: true,
        tickets: true,
        user: true,
      },
    });

    const updatedManagers = updatePetrolStation?.managers.map(
      (item) => item.id,
    );
    const tickets = updatePetrolStation?.tickets.map((item) => item.id);

    return {
      ...updatePetrolStation,
      managers: updatedManagers,
      tickets,
    };
  };

  delete = async (id: string) => {
    try {
      const { id: deletedPetrolStationId } =
        await this.client.petrolStation.delete({
          where: { id },
        });

      return deletedPetrolStationId;
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(error.message);
      }
    }
  };
}

export default new PetrolStationRepository();
