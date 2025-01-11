import { Request, Response } from "express";
import { Code } from "../models/Code";
import { fullCodeTypes } from "../types/compilerTypes";
export const saveCode = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const {fullCode,title}: {fullCode: fullCodeTypes,title: string} = req.body;

    console.log(req._id);
    // Extract fullCode from the body

    let ownerName = "Anonymous";
    let ownerInfo = undefined;
    let user = undefined;
    let isAunthenticated = false
    if (req._id) {
      user = await User.findById(req._id);
      if (!user) {
        return res.status(400).send({ message: "User not found." });
      }
      ownerName = user?.username;
      ownerInfo = user?._id;
      isAunthenticated = true;
    }
    if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
      return res.status(400).json({ error: "Missing code data" });
    }

    const newCode = await Code.create({
      fullCode: {
        html: fullCode.html,
        css: fullCode.css,
        javascript: fullCode.javascript,
      },
      title,
      ownerName,
      ownerInfo,
    });
  console.log(newCode);

  if(isAunthenticated && user){
    user.savedCodes.push(newCode._id);
    await user.save();
  }
    return res
      .status(200)
      .json({ message: "Code saved successfully", fullCode, url: newCode._id });
  } catch (error) {
    console.error(`Error in saving code: ${error}`);
    return res.status(500).json({ error: "Error in saving code" });
  }
};

import mongoose from "mongoose";
import { AuthRequest } from "../middlewares/verifyToken";
import { User } from "../models/User";

export const loadCode = async (req: Request, res: Response) => {
  try {
    const { urlId } = req.body;
    console.log(req.body);

    // Check if urlId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(urlId as string)) {
      return res.status(400).json({ error: "Invalid URL ID format" });
    }

    const existingCode = await Code.findById(urlId);

    if (!existingCode) {
      return res.status(404).json({ error: "Code not found" });
    } else {
      return res.status(200).json({
        message: "Code loaded successfully",
        fullCode: existingCode.fullCode,
      });
    }
  } catch (error) {
    console.error(`Error in loading code: ${error}`);
    return res.status(500).json({ error: "Error in loading code" });
  }
};
