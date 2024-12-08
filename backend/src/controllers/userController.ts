import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { Code } from "../models/Code";
import { saveCode } from "./compilerController";

const inputValidation = z.object({
  email: z.string().email().max(70),
  username: z.string().min(3).max(8),
  password: z.string().min(4),
});

const inputValidationLogin = z.object({
  userId: z.string().min(4).max(40),
  password: z.string().min(4),
});

export const signup = async (req: Request, res: Response) => {
  const parsedInput = inputValidation.safeParse(req.body);

  if (!parsedInput.success) {
    return res
      .status(400)
      .send({ message: "Invalid input", errors: parsedInput.error });
  }
  const { email, username, password } = parsedInput.data;

  try {
    // Check if the user already exists by email or username
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(400)
        .send({
          message: "User already exists with the given email or username",
        });
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
  const parsedInput = inputValidationLogin.safeParse(req.body);

  if (!parsedInput.success) {
    return res
      .status(400)
      .send({ message: "Invalid input", errors: parsedInput.error });
  }
  const { userId, password } = parsedInput.data;

  try {
    let existingUser = undefined
   
    if(userId.includes("@")){
      existingUser = await User.findOne({
        email: userId,
      });
    }else{
      existingUser = await User.findOne({
        username: userId,
      });
    }

    if (!existingUser) {
      return res.status(400).send({ message: "User does not exist" });
    }

    const matchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!matchedPassword) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const jwtKey = process.env.JWT_KEY as string;
    if (!jwtKey) {
      return res
        .status(500)
        .send({
          message: "JWT secret key is missing in environment variables",
        });
    }

    const jwtToken = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
      },
      jwtKey
    );

    res.cookie("token", jwtToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // Expires in 7 days
    });

    return res
      .status(200)
      .send({
        message: "Login successful",
        username: existingUser.username,
        email: existingUser.email,
        token: jwtToken,
        saveCodes: existingUser.savedCodes,
      });
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
