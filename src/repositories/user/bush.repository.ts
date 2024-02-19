import { Bush } from "@prisma/client";
import { OrderByType, WhereType, getAllProperties } from "#root/types.js";
import Repository from "../repository.js";

class BushRepository extends Repository {
  create = async (bush: Bush) => {
    const { id } = await this.client.bush.create({ data: bush });
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

    const items = await this.client.bush.findMany({
      where,
      skip: start,
      take: end ? end - start : undefined,
      orderBy,
    });

    return items;
  };

  getUnique = async (id: string): Promise<Bush | null> => {
    const bush = await this.client.bush.findUnique({ where: { id } });
    return bush;
  };

  update = async (bush: Bush): Promise<Bush> => {
    const { id } = bush;
    const updateBush = await this.client.bush.update({
      data: bush,
      where: { id },
    });
    return updateBush;
  };

  delete = async (id: string) => {
    const { id: deletedBushId } = await this.client.bush.delete({
      where: { id },
    });
    return deletedBushId;
  };
}

export default new BushRepository();
