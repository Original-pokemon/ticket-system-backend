const StatusHistory = {
  type: "object",
  properties: {
    id: { type: "string" },
    ticket_id: { type: "string" },
    user_id: { type: "string" },
    ticket_status: { type: "number" },
    created_at: { type: "string", format: "date-time" },
  },
  required: ["ticket_id", "user_id", "ticket_status"],
  additionalProperties: false,
};

const getStatusHistoriesSchema = {
  tags: ["status-history"],
  response: {
    200: {
      type: "array",
      items: StatusHistory,
    },
  },
};

const getStatusHistorySchema = {
  tags: ["status-history"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: StatusHistory,
  },
};

const createStatusHistorySchema = {
  tags: ["status-history"],
  body: StatusHistory,
  response: {
    200: {
      type: "string",
    },
  },
};

const updateStatusHistorySchema = {
  tags: ["status-history"],
  params: {
    id: { type: "string" },
  },
  body: StatusHistory,
  response: {
    200: StatusHistory,
  },
};

const deleteStatusHistorySchema = {
  tags: ["status-history"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: {
      type: "string",
    },
  },
};

export {
  createStatusHistorySchema,
  deleteStatusHistorySchema,
  getStatusHistorySchema,
  getStatusHistoriesSchema,
  updateStatusHistorySchema,
};
