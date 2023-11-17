import ticketRepository from "#root/repositories/ticket/ticket.repository.js";
import { Ticket } from "@prisma/client";
import {
  createResourceHandler,
  deleteResourceHandler,
  getResourceHandler,
  updateResourceHandler,
  getResourcesHandler,
} from "../common-resource-handler.js";

const ticketResource = {
  getAll: ticketRepository.getAll,
  getUnique: ticketRepository.getUnique,
  create: ticketRepository.create,
  update: ticketRepository.update,
  delete: ticketRepository.delete,
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
