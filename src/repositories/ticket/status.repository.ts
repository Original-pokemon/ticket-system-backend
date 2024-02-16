import { Status } from "@prisma/client";
import Repository from "../repository.js";

class StatusRepository extends Repository {
  create = async (status: Status): Promise<number> => {
    const { id } = await this.client.status.create({ data: status });
    return id;
  };

  getAll = async (): Promise<Status[]> => {
    const statuses = await this.client.status.findMany();
    return statuses;
  };

  getUnique = async (id: number): Promise<Status | null> => {
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

  delete = async (id: number): Promise<number> => {
    const { id: deleteStatusId } = await this.client.status.delete({
      where: { id },
    });
    return deleteStatusId;
  };
}

export default new StatusRepository();
