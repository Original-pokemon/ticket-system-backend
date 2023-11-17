import { Bush } from "@prisma/client";
import Repository from "../repository.js";

class BushRepository extends Repository {
  create = async (bush: Bush): Promise<Bush> => {
    const createdBush = await this.client.bush.create({ data: bush });
    return createdBush;
  };

  getAll = async (): Promise<Bush[]> => {
    const bushes = await this.client.bush.findMany();
    return bushes;
  };

  getUnique = async (id: number): Promise<Bush | null> => {
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

  delete = async (id: number): Promise<Bush> => {
    const deleteBush = await this.client.bush.delete({
      where: { id },
    });
    return deleteBush;
  };
}

export default new BushRepository();
