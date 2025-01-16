import express from "express";
import { login, logout, signup, userDetails } from "../controllers/userController";
import {verifyToken}  from "../middlewares/verifyToken";
import { getMyCodes } from "../controllers/compilerController";

const userRouter = express.Router();

userRouter.post("/signup", signup as any);
userRouter.post("/login", login as any);
userRouter.post("/logout", logout as any);
userRouter.get("/user-details",verifyToken, userDetails as any);
userRouter.get("/my-codes", verifyToken,getMyCodes as any)

export default userRouter;