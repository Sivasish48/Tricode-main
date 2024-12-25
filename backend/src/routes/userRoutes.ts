import express from "express";
import { login, logout, signup, userDetails } from "../controllers/userController";
import {verifyToken}  from "../middlewares/verifyToken";

const userRouter = express.Router();

userRouter.post("/signup", signup as any);
userRouter.post("/login", login as any);
userRouter.post("/logout", logout as any);
userRouter.get("/user-details",verifyToken, userDetails as any);

export default userRouter;