import { User } from "@prisma/client";
import { OrderByType, WhereType, getAllProperties } from "#root/types.js";
import Repository from "../repository.js";

class UserRepository extends Repository {
  create = async (user: User): Promise<string> => {
    const { id } = await this.client.user.create({ data: user });
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

    const items = await this.client.user.findMany({
      where,
      skip: start,
      take: end ? end - start : undefined,
      orderBy,
    });

    return items;
  };

  getUnique = async (id: string): Promise<User | null> => {
    const user = await this.client.user.findUnique({ where: { id } });
    return user;
  };

  update = async (user: User): Promise<User> => {
    const { id } = user;
    const updatedUser = await this.client.user.update({
      data: user,
      where: { id },
    });
    return updatedUser;
  };

  delete = async (id: string): Promise<string> => {
    const { id: deletedUserId } = await this.client.user.delete({
      where: { id },
    });
    return deletedUserId;
  };
}

export default new UserRepository();
