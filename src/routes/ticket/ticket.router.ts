import { FastifyPluginCallback } from "fastify/types/plugin.js";
import { Ticket } from "@prisma/client";
import {
  createTicketHandler,
  deleteTicketHandler,
  getTicketHandler,
  getTicketsHandler,
  updateTicketHandler,
} from "#root/controllers/handlers/ticket/ticket.handler.js";
import {
  createTicketSchema,
  deleteTicketSchema,
  getTicketSchema,
  getTicketsSchema,
  updateTicketSchema,
} from "#root/controllers/schemas/ticket/ticket.schema.js";

import { APIRoute } from "./api-route.js";

const getTicketsOptions = {
  schema: getTicketsSchema,
  handler: getTicketsHandler,
};

const getTicketOptions = {
  schema: getTicketSchema,
  handler: getTicketHandler,
};

const createTicketOptions = {
  schema: createTicketSchema,
  handler: createTicketHandler,
};

const updateTicketOptions = {
  schema: updateTicketSchema,
  handler: updateTicketHandler,
};

const deleteTicketOptions = {
  schema: deleteTicketSchema,
  handler: deleteTicketHandler,
};

export const ticketRouters: FastifyPluginCallback = (
  instance,
  _options,
  done,
) => {
  instance.get(APIRoute.Ticket.All, getTicketsOptions);

  instance.get<{
    Params: {
      id: string;
    };
  }>(APIRoute.Ticket.Info, getTicketOptions);

  instance.post<{
    Body: Ticket;
  }>(APIRoute.Ticket.Create, createTicketOptions);

  instance.put<{
    Body: Ticket;
  }>(APIRoute.Ticket.Update, updateTicketOptions);

  instance.delete<{
    Params: {
      id: string;
    };
  }>(APIRoute.Ticket.Delete, deleteTicketOptions);

  done();
};
