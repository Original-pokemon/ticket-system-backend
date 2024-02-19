import { Attachment } from "@prisma/client";
import Repository from "../repository.js";
import { OrderByType, WhereType, getAllProperties } from "../types.js";

class AttachmentRepository extends Repository {
  create = async (attachment: Attachment): Promise<string> => {
    const { id } = await this.client.attachment.create({
      data: attachment,
    });
    return id;
  };

  getAll = async (properties: getAllProperties) => {
    const { ids, start = 0, end, filter, sort } = properties;

    const where: WhereType = {};
    const orderBy: OrderByType = {};

    if (ids) {
      where.id = { in: ids };
    }

    if (filter && filter.key && filter.value) {
      where[filter.key] = filter.value;
    }

    if (sort && sort.orderBy) {
      orderBy[sort.orderBy] = sort.sort;
    }

    const items = await this.client.attachment.findMany({
      where,
      skip: start,
      take: end ? end - start : undefined,
      orderBy,
    });

    return items;
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

  delete = async (id: string): Promise<string> => {
    const { id: deleteAttachmentId } = await this.client.attachment.delete({
      where: { id },
    });
    return deleteAttachmentId;
  };
}

export default new AttachmentRepository();
