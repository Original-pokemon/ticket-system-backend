import { StatusHistory } from "@prisma/client";
import { getAllProperties } from "#root/types.js";
import getPropertiesGetAll from "#root/helpers/get-properties-get-all.js";
import Repository from "../repository.js";

class StatusHistoryRepository extends Repository {
  create = async (statusHistory: StatusHistory): Promise<string> => {
    const { id } = await this.client.statusHistory.create({
      data: statusHistory,
    });
    return id;
  };

  getAll = async (properties: getAllProperties) => {
    const result = await this.client.statusHistory.findManyAndCount(
      getPropertiesGetAll(properties),
    );

    return result;
  };

  getUnique = async (id: string): Promise<StatusHistory | null> => {
    const statusHistory = await this.client.statusHistory.findUnique({
      where: { id },
    });
    return statusHistory;
  };

  update = async ({ id, ...data }: StatusHistory): Promise<StatusHistory> => {
    const updateStatusHistory = await this.client.statusHistory.update({
      data,
      where: { id },
    });
    return updateStatusHistory;
  };

  delete = async (id: string): Promise<string> => {
    const { id: deletedStatusHistoryId } =
      await this.client.statusHistory.delete({
        where: { id },
      });
    return deletedStatusHistoryId;
  };
}

export default new StatusHistoryRepository();
