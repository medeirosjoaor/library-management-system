import { UUID } from "crypto";

type RegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type ReturnUser = {
  id: UUID;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
};

export type { RegisterUser, ReturnUser };
