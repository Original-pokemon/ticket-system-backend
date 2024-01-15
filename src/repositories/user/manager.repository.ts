/* eslint-disable camelcase */
import { Manager } from "@prisma/client";
import Repository from "../repository.js";

const convertPetrolStationsToTicket = (
  petrolStations: {
    user_id: string;
    tickets: {
      id: string;
    }[];
  }[],
) => {
  return petrolStations.map((station) => ({
    petrol_station: station.user_id,
    tickets: station.tickets.map((ticket) => ticket.id),
  }));
};

class ManagerRepository extends Repository {
  create = async (manager: Manager): Promise<Manager> => {
    const createdManager = await this.client.manager.create({
      data: manager,
    });
    return createdManager;
  };

  getAll = async () => {
    const managers = await this.client.manager.findMany({
      include: {
        user: true,
      },
    });

    return managers;
  };

  getUnique = async (id: string) => {
    const manager = await this.client.manager.findUnique({
      where: { user_id: id },
      include: {
        petrol_stations: {
          select: {
            user_id: true,
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
        petrol_stations: manager.petrol_stations.map(
          (station) => station.user_id,
        ),
      };
    }

    return manager;
  };

  update = async (manager: Manager & { petrol_stations: string[] }) => {
    const { user_id: id, petrol_stations } = manager;
    const petrolStations = petrol_stations.map((petrol_station) => ({
      user_id: petrol_station,
    }));

    await this.client.manager.update({
      data: {
        petrol_stations: {
          set: [],
        },
      },
      where: { user_id: id },
    });

    const updateManager = await this.client.manager.update({
      data: {
        petrol_stations: {
          connect: petrolStations,
        },
      },
      where: { user_id: id },
    });
    return updateManager;
  };

  delete = async (id: string) => {
    const deleteManager = await this.client.manager.delete({
      where: { user_id: id },
    });
    return deleteManager;
  };
}

export default new ManagerRepository();
