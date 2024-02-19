import { Manager } from "@prisma/client";
import Repository from "../repository.js";
import { OrderByType, WhereType, getAllProperties } from "../types.js";

const convertPetrolStationsToTicket = (
  petrolStations: {
    id: string;
    tickets: {
      id: string;
    }[];
  }[],
) => {
  return petrolStations.map((station) => ({
    petrol_station: station.id,
    tickets: station.tickets.map((ticket) => ticket.id),
  }));
};

class ManagerRepository extends Repository {
  create = async (manager: Manager): Promise<string> => {
    const { id } = await this.client.manager.create({
      data: manager,
    });
    return id;
  };

  getAll = async (properties: getAllProperties) => {
    const { ids, start = 0, end, filter, sort } = properties;

    const where: WhereType = {};
    const orderBy: OrderByType = {};

    if (ids) {
      where.id = { in: ids };
    }

    if (filter && filter.key && filter.value) {
      where[filter.key] = filter.value;
    }

    if (sort && sort.orderBy) {
      orderBy[sort.orderBy] = sort.sort;
    }

    const items = await this.client.manager.findMany({
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
    const manager = await this.client.manager.findUnique({
      where: { id },
      include: {
        petrol_stations: {
          select: {
            id: true,
            tickets: {
              select: {
                id: true,
              },
            },
          },
        },
        user: true,
      },
    });

    if (manager) {
      return {
        ...manager,
        tickets: convertPetrolStationsToTicket(manager.petrol_stations),
        petrol_stations: manager.petrol_stations.map((station) => station.id),
      };
    }

    return manager;
  };

  update = async (
    manager: Manager & {
      petrol_stations: string[];
    },
  ) => {
    const { id, petrol_stations } = manager;
    const petrolStations = petrol_stations.map((petrol_station) => ({
      id: petrol_station,
    }));

    await this.client.manager.update({
      data: {
        petrol_stations: {
          set: [],
        },
      },
      where: { id },
    });

    const updateManager = await this.client.manager.update({
      where: { id },
      data: {
        petrol_stations: {
          connect: petrolStations,
        },
      },
      include: {
        petrol_stations: {
          select: {
            id: true,
            tickets: {
              select: {
                id: true,
              },
            },
          },
        },
        user: true,
      },
    });

    return {
      ...updateManager,
      tickets: convertPetrolStationsToTicket(updateManager.petrol_stations),
      petrol_stations: updateManager.petrol_stations.map(
        (station) => station.id,
      ),
    };
  };

  delete = async (id: string) => {
    const { id: deletedManagerId } = await this.client.manager.delete({
      where: { id },
    });
    return deletedManagerId;
  };
}

export default new ManagerRepository();
