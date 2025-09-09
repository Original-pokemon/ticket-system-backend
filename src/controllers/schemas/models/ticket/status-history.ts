const StatusHistoryProperties = {
  id: { type: "string" },
  ticket_id: { type: "string" },
  user_id: { type: "string" },
  ticket_status: { type: "string" },
  created_at: { type: "string", format: "date-time" },
};

const StatusHistorySchema = {
  $id: "statusHistory",
  type: "object",
  properties: StatusHistoryProperties,
};

export { StatusHistorySchema };
