import { Status } from "@prisma/client";
import Repository from "../repository.js";
import { OrderByType, WhereType, getAllProperties } from "../types.js";

class StatusRepository extends Repository {
  create = async (status: Status) => {
    const { id } = await this.client.status.create({ data: status });
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

    const items = await this.client.status.findMany({
      where,
      skip: start,
      take: end ? end - start : undefined,
      orderBy,
    });

    return items;
  };

  getUnique = async (id: string): Promise<Status | null> => {
    const status = await this.client.status.findUnique({ where: { id } });
    return status;
  };

  update = async (status: Status): Promise<Status> => {
    const { id } = status;
    const updateStatus = await this.client.status.update({
      data: status,
      where: { id },
    });
    return updateStatus;
  };

  delete = async (id: string) => {
    const { id: deleteStatusId } = await this.client.status.delete({
      where: { id },
    });
    return deleteStatusId;
  };
}

export default new StatusRepository();
