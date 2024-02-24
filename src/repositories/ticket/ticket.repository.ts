import { Comment, Ticket } from "@prisma/client";

import { logger } from "#root/logger.js";
import { saveAttachments } from "#root/helpers/save-attachments.js";
import fs from "node:fs/promises";
import { getAllProperties } from "#root/types.js";
import getPropertiesGetAll from "#root/helpers/get-properties-get-all.js";
import { uploadsDirectory } from "#root/const.js";
import Repository from "../repository.js";

class TicketRepository extends Repository {
  create = async (
    ticket: Ticket & { user_id: string } & { attachments: string[] } & {
      comments: Comment[];
    },
  ): Promise<string> => {
    const { user_id, comments, ...ticket_ } = ticket;

    const attachments = await saveAttachments(ticket_.attachments);

    const { id } = await this.client.ticket.create({
      data: {
        ...ticket_,
        comments: {
          createMany: { data: comments },
        },
        status_history: {
          create: {
            user_id,
            ticket_status: ticket_.status_id,
          },
        },
        attachments: {
          createMany: { data: attachments },
        },
      },
    });

    return id;
  };

  getAll = async (properties: getAllProperties) => {
    const items = await this.client.ticket.findMany(
      getPropertiesGetAll(properties),
    );

    return items;
  };

  getUnique = async (id: string) => {
    const ticket = await this.client.ticket.findUnique({
      where: { id },
      include: {
        status_history: {
          orderBy: {
            created_at: "desc",
          },
        },
        comments: {
          select: {
            id: true,
          },
        },
        attachments: {
          select: {
            id: true,
          },
        },
      },
    });

    const attachmentsId =
      ticket?.attachments.map(({ id: attachmentId }) => attachmentId) || [];

    const commentsId =
      ticket?.comments.map(({ id: commentId }) => commentId) || [];

    return ticket
      ? { ...ticket, attachments: attachmentsId, comments: commentsId }
      : ticket;
  };

  update = async (
    ticket: Ticket & {
      attachments: string[];
      comments: string[];
      status_history: string[];
      user_id: string;
    },
  ): Promise<Ticket> => {
    const {
      attachments: _attachments,
      comments: _comments,
      status_history: _status_history,
      user_id: userId,
      ...ticketWithoutAttachment
    } = ticket;

    const updateTicket = await this.client.ticket.update({
      data: {
        ...ticketWithoutAttachment,
        status_history: {
          create: {
            user_id: userId,
            ticket_status: ticket.status_id,
          },
        },
      },
      where: { id: ticket.id },
    });

    return updateTicket;
  };

  delete = async (id: string): Promise<string> => {
    const ticket = await this.getUnique(id);
    if (ticket) {
      const promises = ticket.attachments.map(async (fileId) => {
        const localPath = `${uploadsDirectory}\\${fileId}.jpg`;
        try {
          const promise = await fs.unlink(localPath);
          return promise;
        } catch (error) {
          logger.warn(error);
        }
      });

      Promise.all(promises);

      await this.client.ticket.update({
        where: { id },
        data: {
          attachments: {
            deleteMany: {},
          },
          comments: {
            deleteMany: {},
          },
          status_history: {
            deleteMany: {},
          },
        },
      });
      const { id: deletedTicketId } = await this.client.ticket.delete({
        where: { id },
      });
      return deletedTicketId;
    }
    return id;
  };
}

export default new TicketRepository();
