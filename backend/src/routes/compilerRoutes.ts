import express from "express";
import {
  saveCode,
  loadCode,
  deleteCode,
} from "../controllers/compilerController";
import { verifyTokenAnonymous } from "../middlewares/verifyTokenAnonymous";
import { verifyToken } from "../middlewares/verifyToken";
export const compilerRouter = express.Router();

compilerRouter.post("/save", verifyTokenAnonymous, async (req, res) => {
  await saveCode(req as any, res as any);
});

compilerRouter.post("/load", async (req, res) => {
  await loadCode(req as any, res as any);
});

compilerRouter.delete("/delete/:id", verifyToken, deleteCode as any);

