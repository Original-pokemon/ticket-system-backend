import { Bush } from "@prisma/client";
import { getAllProperties } from "#root/types.js";
import getPropertiesGetAll from "#root/helpers/get-properties-get-all.js";
import Repository from "../repository.js";

class BushRepository extends Repository {
  create = async (bush: Bush) => {
    const { id } = await this.client.bush.create({ data: bush });
    return id;
  };

  getAll = async (properties: getAllProperties) => {
    const result = await this.client.bush.findManyAndCount(
      getPropertiesGetAll(properties),
    );

    return result;
  };

  getUnique = async (id: string): Promise<Bush | null> => {
    const bush = await this.client.bush.findUnique({ where: { id } });
    return bush;
  };

  update = async ({ id, ...data }: Bush): Promise<Bush> => {
    const updateBush = await this.client.bush.update({
      data,
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
