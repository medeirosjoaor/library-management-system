import { Request, Response } from "express";
import { RegisterUser } from "../types/user";
import userModel from "../models/user";

async function register(request: Request, response: Response) {
  const registerUser = request.body as RegisterUser;

  try {
    const returnUser = await userModel.register(registerUser);

    if (returnUser) {
      return response.status(201).json(returnUser);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).json({ message: error.message });
    }
  }

  return response.end();
}

export default { register };
