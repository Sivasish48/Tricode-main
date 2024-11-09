import express from "express";
import { login, logout, signup } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/signup", signup as any);
userRouter.post("/login", login as any);
userRouter.post("/logout", logout as any);

export default userRouter;