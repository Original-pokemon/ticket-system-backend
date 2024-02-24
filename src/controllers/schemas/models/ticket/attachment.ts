const attachmentProperties = {
  id: { type: "string" },
  comment_id: { type: "string" },
  path: { type: "string" },
};

const AttachmentSchema = {
  $id: "attachment",
  type: "object",
  properties: attachmentProperties,
};

export { AttachmentSchema };
