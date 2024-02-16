import { StatusHistory } from "@prisma/client";
import Repository from "../repository.js";

class StatusHistoryRepository extends Repository {
  create = async (statusHistory: StatusHistory): Promise<string> => {
    const { id } = await this.client.statusHistory.create({
      data: statusHistory,
    });
    return id;
  };

  getAll = async (): Promise<StatusHistory[]> => {
    const statusHistories = await this.client.statusHistory.findMany();
    return statusHistories;
  };

  getMany = async ([userId, status]: [string, string]) => {
    const statusHistories = await this.client.statusHistory.findMany({
      where: {
        user_id: userId,
        ticket_status: Number(status),
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return statusHistories;
  };

  getUnique = async (id: string): Promise<StatusHistory | null> => {
    const statusHistory = await this.client.statusHistory.findUnique({
      where: { id },
    });
    return statusHistory;
  };

  update = async (statusHistory: StatusHistory): Promise<StatusHistory> => {
    const { id } = statusHistory;
    const updateStatusHistory = await this.client.statusHistory.update({
      data: statusHistory,
      where: { id },
    });
    return updateStatusHistory;
  };

  delete = async (id: string): Promise<string> => {
    const { id: deletedStatusHistoryId } =
      await this.client.statusHistory.delete({
        where: { id },
      });
    return deletedStatusHistoryId;
  };
}

export default new StatusHistoryRepository();
