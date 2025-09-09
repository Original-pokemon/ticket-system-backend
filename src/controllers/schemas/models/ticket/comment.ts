const commentProperties = {
  id: { type: "string" },
  ticket_id: { type: "string" },
  user_id: { type: "string" },
  text: { type: "string" },
  attachments: {
    type: "array",
    items: { $ref: "attachment" },
  },
  created_at: { type: "string", format: "date-time" },
};

const CommentSchema = {
  $id: "comment",
  type: "object",
  properties: commentProperties,
};

export { CommentSchema };
