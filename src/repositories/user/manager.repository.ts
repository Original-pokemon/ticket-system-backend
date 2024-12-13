import { Manager } from "@prisma/client";
import { getAllProperties } from "#root/types.js";
import getPropertiesGetAll from "#root/helpers/get-properties-get-all.js";
import Repository from "../repository.js";

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
    const result = await this.client.manager.findManyAndCount(
      getPropertiesGetAll(properties, {
        petrol_stations: {
          include: {
            tickets: true,
          },
        },
        user: true,
      }),
    );

    return result;
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

  update = async ({ id, ...data }: Manager & { petrol_stations: string[] }) => {
    const { petrol_stations } = data;
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
