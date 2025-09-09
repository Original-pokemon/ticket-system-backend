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
    const result = await this.client.status.findManyAndCount(
      getPropertiesGetAll(properties),
    );

    return result;
  };

  getUnique = async (id: string): Promise<Status | null> => {
    const status = await this.client.status.findUnique({ where: { id } });
    return status;
  };

  update = async ({ id, ...data }: Status): Promise<Status> => {
    const updateStatus = await this.client.status.update({
      data,
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
