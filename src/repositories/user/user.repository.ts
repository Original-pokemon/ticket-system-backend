import { User } from "@prisma/client";
import Repository from "../repository.js";

class UserRepository extends Repository {
  create = async (user: User): Promise<User> => {
    const createdUser = await this.client.user.create({ data: user });
    return createdUser;
  };

  getAll = async (): Promise<User[]> => {
    const users = await this.client.user.findMany();
    return users;
  };

  getMany = async (data: string[]): Promise<User[]> => {
    const users = await this.client.user.findMany({
      where: {
        id: {
          in: data,
        },
      },
    });

    return users;
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

  delete = async (id: string): Promise<User> => {
    const deleteUser = await this.client.user.delete({
      where: { id },
    });
    return deleteUser;
  };
}

export default new UserRepository();
