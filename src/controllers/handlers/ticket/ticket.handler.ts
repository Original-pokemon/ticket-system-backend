import TicketRepository from "#root/repositories/ticket/ticket.repository.js";
import { Ticket } from "@prisma/client";
import {
  createResourceHandler,
  deleteResourceHandler,
  getResourceHandler,
  updateResourceHandler,
  getResourcesHandler,
  getManyResourcesHandler,
} from "../common-resource-handler.js";

const ticketResource = {
  getAll: TicketRepository.getAll,
  getUnique: TicketRepository.getUnique,
  getMany: TicketRepository.getMany,
  create: TicketRepository.create,
  update: TicketRepository.update,
  delete: TicketRepository.delete,
  name: "ticket",
};

export const getTicketsHandler = getResourcesHandler<string>(ticketResource);
export const getTicketHandler = getResourceHandler<string>(ticketResource);
export const createTicketHandler = createResourceHandler<string, Ticket>(
  ticketResource,
);
export const updateTicketHandler = updateResourceHandler<string, Ticket>(
  ticketResource,
);
export const deleteTicketHandler =
  deleteResourceHandler<string>(ticketResource);
export const getSelectTicketsHandler =
  getManyResourcesHandler<string>(ticketResource);
