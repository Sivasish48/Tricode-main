import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

const inputValidation = z.object({
  email: z.string().email().max(70),
  username: z.string().min(3).max(8),
  password: z.string().min(4),
});

export const signup = async (req: Request, res: Response) => {
  // const { username, email, password } = req.body;

  const parsedInput = inputValidation.safeParse(req.body);

  if(!parsedInput.success){
    return res.status(400).send({ message: "Invalid input", errors: parsedInput.error });
  }
  const { email, username, password } = parsedInput.data;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    return res.status(201).send({ message: "User created successfully", user });
  } catch (error) {
    return res.status(500).send({ message: "Error creating user", error });
  }
};

export const login = async (req: Request, res: Response) => {
  // const { email, password } = req.body;

  const parsedInput = inputValidation.safeParse(req.body)

  if(!parsedInput.success){
    return res.status(400).send({ message: "Invalid input", errors: parsedInput.error });
  }
  const { email, password } = parsedInput.data;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).send({ message: "User does not exist" });
    }

    const matchedPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchedPassword) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const jwtKey = process.env.JWT_KEY as string;
    if (!jwtKey) {
      return res.status(500).send({ message: "JWT secret key is missing in environment variables" });
    }

    const jwtToken = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_KEY as string,
    );

    res.cookie("token", jwtToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // Expires in 7 days
    });

    return res.status(200).send({ message: "Login successful", user: existingUser, token: jwtToken });
  } catch (error) {
    return res.status(500).send({ message: "Error during login", error });
  }
};


export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
  return res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    res.status(500).send({ message: "Error during logout", error });
  }
  
};