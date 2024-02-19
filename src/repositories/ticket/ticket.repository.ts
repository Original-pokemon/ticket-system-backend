import { Comment, Ticket } from "@prisma/client";

import { logger } from "#root/logger.js";
import { saveAttachments } from "#root/helpers/save-attachments.js";
import { config } from "#root/config.js";
import fs from "node:fs/promises";
import { OrderByType, WhereType, getAllProperties } from "#root/types.js";
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
    const { idList, start = 0, end, filter, sort } = properties;

    const where: WhereType = {};
    const orderBy: OrderByType = {};

    if (idList) {
      where.id = { in: idList };
    }

    if (filter && filter.key && filter.value) {
      where[filter.key] = filter.value;
    }

    if (sort && sort.orderBy) {
      orderBy[sort.orderBy] = sort.sort;
    }

    const items = await this.client.ticket.findMany({
      where,
      skip: start,
      take: end ? end - start : undefined,
      orderBy,
    });

    return items;
  };

  getMany = async (data: string[]): Promise<Ticket[]> => {
    const tickets = await this.client.ticket.findMany({
      where: {
        id: {
          in: data,
        },
      },
    });

    return tickets;
  };

  getUnique = async (id: string) => {
    const ticket = await this.client.ticket.findUnique({
      where: { id },
      include: {
        status_history: true,
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
    ticket: Ticket & { attachments: string[]; comments: string[] },
  ): Promise<Ticket> => {
    const {
      attachments: _attachments,
      comments: _comments,
      ...ticketWithoutAttachment
    } = ticket;
    const updateTicket = await this.client.ticket.update({
      data: ticketWithoutAttachment,
      where: { id: ticket.id },
    });

    return updateTicket;
  };

  delete = async (id: string): Promise<string> => {
    const ticket = await this.getUnique(id);
    if (ticket) {
      const promises = ticket.attachments.map(async (fileId) => {
        const localPath = `${config.PATH_TO_SAVE_FILE}\\${fileId}.jpg`;
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
