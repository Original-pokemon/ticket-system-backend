import { Attachment } from "@prisma/client";
import Repository from "../repository.js";

class AttachmentRepository extends Repository {
  create = async (attachment: Attachment): Promise<Attachment> => {
    const createdAttachment = await this.client.attachment.create({
      data: attachment,
    });
    return createdAttachment;
  };

  getAll = async (): Promise<Attachment[]> => {
    const statusHistories = await this.client.attachment.findMany();
    return statusHistories;
  };

  getMany = async (data: string[]) => {
    if (data) {
      const attachments = await this.client.attachment.findMany({
        where: {
          id: {
            in: data,
          },
        },
      });

      return attachments;
    }
    return [];
  };

  getUnique = async (id: string): Promise<Attachment | null> => {
    const attachment = await this.client.attachment.findUnique({
      where: { id },
    });
    return attachment;
  };

  update = async (attachment: Attachment): Promise<Attachment> => {
    const { id } = attachment;
    const updateAttachment = await this.client.attachment.update({
      data: attachment,
      where: { id },
    });
    return updateAttachment;
  };

  delete = async (id: string): Promise<Attachment> => {
    const deleteAttachment = await this.client.attachment.delete({
      where: { id },
    });
    return deleteAttachment;
  };
}

export default new AttachmentRepository();
