import { StatusHistory } from "@prisma/client";
import Repository from "../repository.js";

class StatusHistoryRepository extends Repository {
  create = async (statusHistory: StatusHistory): Promise<StatusHistory> => {
    const createdStatusHistory = await this.client.statusHistory.create({
      data: statusHistory,
    });
    return createdStatusHistory;
  };

  getAll = async (): Promise<StatusHistory[]> => {
    const statusHistories = await this.client.statusHistory.findMany();
    return statusHistories;
  };

  getUnique = async (ticket_id: string): Promise<StatusHistory | null> => {
    const statusHistory = await this.client.statusHistory.findUnique({
      where: { ticket_id },
    });
    return statusHistory;
  };

  update = async (statusHistory: StatusHistory): Promise<StatusHistory> => {
    const { ticket_id } = statusHistory;
    const updateStatusHistory = await this.client.statusHistory.update({
      data: statusHistory,
      where: { ticket_id },
    });
    return updateStatusHistory;
  };

  delete = async (ticket_id: string): Promise<StatusHistory> => {
    const deleteStatusHistory = await this.client.statusHistory.delete({
      where: { ticket_id },
    });
    return deleteStatusHistory;
  };
}

export default new StatusHistoryRepository();
