import { PetrolStation } from "@prisma/client";
import { OrderByType, WhereType, getAllProperties } from "#root/types.js";
import Repository from "../repository.js";

class PetrolStationRepository extends Repository {
  create = async (petrolStation: PetrolStation): Promise<string> => {
    const { id } = await this.client.petrolStation.create({
      data: petrolStation,
    });
    return id;
  };

  getAll = async (properties: getAllProperties) => {
    const { id, start = 0, end, filter, sort } = properties;

    const where: WhereType = {};
    const orderBy: OrderByType = {};

    if (id) {
      where.id = { in: id };
    }

    if (filter && filter.key && filter.value) {
      where[filter.key] = filter.value;
    }

    if (sort && sort.orderBy) {
      orderBy[sort.orderBy] = sort.sort;
    }

    const items = await this.client.petrolStation.findMany({
      where,
      skip: start,
      take: end ? end - start : undefined,
      orderBy,
      include: {
        user: true,
      },
    });

    return items;
  };

  getUnique = async (id: string) => {
    const petrolStation = await this.client.petrolStation.findUnique({
      where: {
        id,
      },
      include: {
        tickets: {
          select: {
            id: true,
          },
        },
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
      const tickets = petrolStation?.tickets.map((item) => item.id);
      return { ...petrolStation, managers, tickets };
    }

    return petrolStation;
  };

  update = async (petrolStation: PetrolStation & { managers: string[] }) => {
    const { id, managers } = petrolStation;
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
