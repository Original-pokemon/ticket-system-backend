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
    const items = await this.client.bush.findMany(
      getPropertiesGetAll(properties),
    );

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
