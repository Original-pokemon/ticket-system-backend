import { Attachment } from "@prisma/client";
import { getAllProperties } from "#root/types.js";
import getPropertiesGetAll from "#root/helpers/get-properties-get-all.js";
import Repository from "../repository.js";

class AttachmentRepository extends Repository {
  create = async (attachment: Attachment): Promise<string> => {
    const { id } = await this.client.attachment.create({
      data: attachment,
    });
    return id;
  };

  getAll = async (properties: getAllProperties) => {
    const items = await this.client.attachment.findMany(
      getPropertiesGetAll(properties),
    );

    return items;
  };

  getUnique = async (id: string): Promise<Attachment | null> => {
    const attachment = await this.client.attachment.findUnique({
      where: { id },
    });
    return attachment;
  };

  update = async ({ id, ...data }: Attachment): Promise<Attachment> => {
    const updateAttachment = await this.client.attachment.update({
      data,
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
