import { UUID } from "crypto";

type RegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type LoginUser = Pick<RegisterUser, "email" | "password">;

type ReturnUser = {
  id: UUID;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  created_at: string;
};

export type { LoginUser, RegisterUser, ReturnUser };
