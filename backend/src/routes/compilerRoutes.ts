import express from "express";
import { saveCode , loadCode, editCode, deleteCode} from "../controllers/compilerController";
import { verifyTokenAnonymous } from "../middlewares/verifyTokenAnonymous";
export const compilerRouter = express.Router();

compilerRouter.post("/save", verifyTokenAnonymous, async (req, res) => {
    await saveCode(req as any, res as any);
  });
  
compilerRouter.post("/load", async (req, res) => {
    await loadCode(req as any, res as any);
});

compilerRouter.put("/edit", verifyTokenAnonymous, async (req, res) => {
    await editCode(req as any, res as any);
});

compilerRouter.delete("/delete/:id", verifyTokenAnonymous, async (req, res) => {
  await deleteCode(req as any, res as any);
});