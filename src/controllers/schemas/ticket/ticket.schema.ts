const Ticket = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    author_id: { type: "string" },
    ticket_category: { type: "number" },
    ticket_priority: { type: "number" },
  },
  required: ["id", "title", "author_id", "ticket_category", "ticket_priority"],
  additionalProperties: false,
};

const getTicketSchema = {
  tags: ["ticket"],
  response: {
    200: {
      type: "array",
      items: Ticket,
    },
  },
};

const getTicketsSchema = {
  tags: ["ticket"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: Ticket,
  },
};

const getSelectTicketsSchema = {
  tags: ["ticket"],
  body: {
    data: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  response: {
    200: {
      type: "array",
      items: Ticket,
    },
  },
};

  },
};

const updateTicketSchema = {
  tags: ["ticket"],
  params: {
    id: { type: "string" },
  },
  body: Ticket,
  response: {
    200: Ticket,
  },
};

const deleteTicketSchema = {
  tags: ["ticket"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: Ticket,
  },
};

export {
  createTicketSchema,
  deleteTicketSchema,
  getTicketsSchema,
  getTicketSchema,
  updateTicketSchema,
};
