import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export interface AuthRequest extends Request {
  _id?: string;

}

export const verifyTokenAnonymous = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  const token = req.cookies?.token;

  if (!token) {
   return next();
  }

  jwt.verify(token, process.env.JWT_KEY!, (err: JsonWebTokenError | null, data: any) => {
    if (err) {
      return res.status(401).send({ message: "You are unauthorized. Invalid token." });
    }

    if (data && data.id) {
      (req as AuthRequest)._id = data.id;
    } else {
      return res.status(400).send({ message: "Invalid token data" });
    }
    next();
  });
};
