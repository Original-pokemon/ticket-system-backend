const userProperties = {
  id: { type: "string" },
  user_name: { type: "string" },
  first_name: { type: "string" },
  last_name: { type: "string" },
  user_group: { type: "string" },
  created_at: { type: "string" },
};

const userSchema = {
  $id: "user",
  type: "object",
  title: "Telegram user profile",
  required: ["id", "user_name", "first_name", "user_group"],
  properties: userProperties,
};

export { userSchema };
