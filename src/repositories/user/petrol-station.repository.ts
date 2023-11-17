import { PetrolStation } from "@prisma/client";
import Repository from "../repository.js";

class PetrolStationRepository extends Repository {
  create = async (petrolStation: PetrolStation) => {
    const createdPetrolStation = await this.client.petrolStation.create({
      data: petrolStation,
    });
    return createdPetrolStation;
  };

  getAll = async () => {
    const petrolStation = await this.client.petrolStation.findMany({
      include: {
        user: true,
      },
    });

    return petrolStation;
  };

  getUnique = async (id: string) => {
    const petrolStation = await this.client.petrolStation.findUnique({
      where: {
        user_id: id,
      },
      include: {
        managers: {
          select: {
            user_id: true,
          },
        },
        user: true,
      },
    });

    if (petrolStation) {
      const managers = petrolStation?.managers.map((item) => item.user_id);
      return { ...petrolStation, managers };
    }

    return petrolStation;
  };

  update = async (petrolStation: PetrolStation & { managers: string[] }) => {
    const { user_id: id, managers } = petrolStation;
    const _managers = managers.map((manager) => ({
      user_id: manager,
    }));

    await this.client.petrolStation.update({
      data: {
        managers: {
          set: [],
        },
      },
      where: { user_id: id },
    });

    const updatePetrolStation = await this.client.petrolStation.update({
      data: {
        managers: {
          connect: _managers,
        },
      },
      where: { user_id: id },
    });
    return updatePetrolStation;
  };

  delete = async (id: string) => {
    try {
      const deletePetrolStation = await this.client.petrolStation.delete({
        where: { user_id: id },
      });

      return deletePetrolStation;
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(error.message);
      }
    }
  };
}

export default new PetrolStationRepository();
