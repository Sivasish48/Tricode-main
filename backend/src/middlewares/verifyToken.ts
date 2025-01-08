import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  _id?: string;
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).send({ message: "You are unauthorized. Token not found." });
    return;
  }

  jwt.verify(
    token,
    process.env.JWT_KEY!,
    (err: JsonWebTokenError | null, data: JwtPayload | string | undefined) => {
      if (err) {
        return res.status(401).send({ message: "You are unauthorized. Invalid token." });
      }

      // If data is valid and contains an ID, set it on the request
      if (typeof data === "object" && data?.id) {
        req._id = data.id as string;
      } else {
        return res.status(400).send({ message: "Invalid token data" });
      }
      next();
    }
  );
};
