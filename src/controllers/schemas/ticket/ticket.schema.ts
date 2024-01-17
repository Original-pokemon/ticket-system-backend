const Ticket = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    user_id: { type: "string" },
    description: { type: "string" },
    attachments: {
      type: "array",
      items: {
        type: "string",
      },
    },
    comments: {
      type: "array",
      items: {
        type: "string",
      },
    },
    status_id: { type: "number" },
    petrol_station_id: { type: "string" },
    ticket_category: { type: ["number", "null"] },
    ticket_priority: { type: ["number", "null"] },
  },
  required: ["title", "petrol_station_id"],
  additionalProperties: false,
};

const getTicketsSchema = {
  tags: ["ticket"],
  response: {
    200: {
      type: "array",
      items: Ticket,
    },
  },
};

const getTicketSchema = {
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

const createTicketSchema = {
  tags: ["ticket"],
  body: Ticket,
  response: {
    200: {
      type: "string",
    },
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
  getSelectTicketsSchema,
  createTicketSchema,
  deleteTicketSchema,
  getTicketsSchema,
  getTicketSchema,
  updateTicketSchema,
};
