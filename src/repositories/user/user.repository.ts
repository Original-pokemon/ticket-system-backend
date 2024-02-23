import { User } from "@prisma/client";
import { getAllProperties } from "#root/types.js";
import getPropertiesGetAll from "#root/helpers/get-properties-get-all.js";
import Repository from "../repository.js";

class UserRepository extends Repository {
  create = async (user: User): Promise<string> => {
    const { id } = await this.client.user.create({ data: user });
    return id;
  };

  getAll = async (properties: getAllProperties) => {
    const items = await this.client.user.findMany(
      getPropertiesGetAll(properties),
    );

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
