const userProperties = {
  id: { type: "string" },
  login: { type: ["string", "null"] },
  user_name: { type: "string" },
  first_name: { type: "string" },
  last_name: { type: ["string", "null"] },
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
