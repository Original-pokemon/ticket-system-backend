import { StatusHistory } from "@prisma/client";
import { OrderByType, WhereType, getAllProperties } from "#root/types.js";
import Repository from "../repository.js";

class StatusHistoryRepository extends Repository {
  create = async (statusHistory: StatusHistory): Promise<string> => {
    const { id } = await this.client.statusHistory.create({
      data: statusHistory,
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

    const items = await this.client.statusHistory.findMany({
      where,
      skip: start,
      take: end ? end - start : undefined,
      orderBy,
    });

    return items;
  };

  getUnique = async (id: string): Promise<StatusHistory | null> => {
    const statusHistory = await this.client.statusHistory.findUnique({
      where: { id },
    });
    return statusHistory;
  };

  update = async (statusHistory: StatusHistory): Promise<StatusHistory> => {
    const { id } = statusHistory;
    const updateStatusHistory = await this.client.statusHistory.update({
      data: statusHistory,
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
