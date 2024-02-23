import { Status } from "@prisma/client";
import { getAllProperties } from "#root/types.js";
import getPropertiesGetAll from "#root/helpers/get-properties-get-all.js";
import Repository from "../repository.js";

class StatusRepository extends Repository {
  create = async (status: Status) => {
    const { id } = await this.client.status.create({ data: status });
    return id;
  };

  getAll = async (properties: getAllProperties) => {
    const items = await this.client.status.findMany(
      getPropertiesGetAll(properties),
    );

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
