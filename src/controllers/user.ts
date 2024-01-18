import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { LoginUser, RegisterUser } from "../types/user";
import userModel from "../models/user";

async function login(request: Request, response: Response) {
  const loginUser = request.body as LoginUser;

  try {
    const returnUser = await userModel.findByEmail(loginUser.email);

    if (returnUser) {
      const { password: hashedPassword, ...remaining } = returnUser;

      if (await bcrypt.compare(loginUser.password, hashedPassword as string)) {
        const token = jsonwebtoken.sign(
          remaining,
          process.env.JWT_SECRET as string,
          { algorithm: "HS256", expiresIn: "30d" }
        );

        return response.status(200).json({ token });
      }

      return response.status(400).json({ message: "Incorrect password." });
    }

    return response.status(404).json({ message: "User does not exist." });
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).json({ message: error.message });
    }
  }

  return response.end();
}

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

export default { login, register };
