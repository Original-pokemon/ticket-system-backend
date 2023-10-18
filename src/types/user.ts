type UserType = {
  id: string;
  user_name: string;
  first_name: string;
  last_name: string | null;
  user_group: string;
  created_at: Date;
};

type GroupType = {
  id: string;
  description: string | null;
};

export { GroupType, UserType };
