import { Request, Response } from "express";
import { Code } from "../models/Code";
import { fullCodeTypes } from "../types/compilerTypes";
// export const saveCode = async (
//   req: AuthRequest,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const {fullCode,title}: {fullCode: fullCodeTypes,title: string} = req.body;

//     console.log(req._id);
//     // Extract fullCode from the body

//     let ownerName = "Anonymous";
//     let ownerInfo = undefined;
//     let user = undefined;
//     let isAunthenticated = false
//     if (req._id) {
//       user = await User.findById(req._id);
//       if (!user) {
//         return res.status(400).send({ message: "User not found." });
//       }
//       ownerName = user?.username;
//       ownerInfo = user?._id;
//       isAunthenticated = true;
//     }
//     if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
//       return res.status(400).json({ error: "Missing code data" });
//     }

//     const newCode = await Code.create({
//       fullCode: fullCode,
//       ownerName: ownerName,
//       ownerInfo: ownerInfo,
//       title: title,
//     });
//   console.log(newCode);

//   if(isAunthenticated && user){
//     user.savedCodes.push(newCode._id);
//     await user.save();
//   }
//     return res
//       .status(200)
//       .json({ message: "Code saved successfully", fullCode, url: newCode._id });
//   } catch (error) {
//     console.error(`Error in saving code: ${error}`);
//     return res.status(500).json({ error: "Error in saving code" });
//   }
// };

export const saveCode = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { fullCode, title }: { fullCode: fullCodeTypes; title: string } =
      req.body;

    if (!title?.trim()) {
      return res.status(400).json({ error: "Title is required." });
    }

    const html = fullCode?.html || ""; // Default to empty string if undefined
    const css = fullCode?.css || ""; // Default to empty string if undefined
    const javascript = fullCode?.javascript || ""; // Default to empty string if undefined

    let ownerName = "Anonymous";
    let ownerInfo = undefined;
    let user = undefined;
    let isAuthenticated = false;

    if (req._id) {
      user = await User.findById(req._id);
      if (!user) {
        return res.status(400).json({ error: "User not found." });
      }
      ownerName = user.username;
      ownerInfo = user._id;
      isAuthenticated = true;
    }

    // Save the code
    const newCode = await Code.create({
      fullCode: { html, css, javascript },
      ownerName,
      ownerInfo,
      title,
    });

    console.log(newCode);

    if (isAuthenticated && user) {
      user.savedCodes.push(newCode._id);
      await user.save();
    }

    return res.status(200).json({
      message: "Code saved successfully",
      fullCode: { html, css, javascript },
      url: newCode._id,
    });
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

export const getMyCodes = async (req: AuthRequest, res: Response) => {
  const userId = req._id;
  try {
    // Ensure we only get codes created by this specific user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch codes where ownerInfo matches the logged-in user's ID
    const userCodes = await Code.find({ ownerInfo: userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json(userCodes);
  } catch (error) {
    console.error(`Error in getting my codes: ${error}`);
    return res.status(500).json({ error: "Error in getting codes" });
  }
};

export const editCode = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.error(`Error in editing code: ${error}`);
    return res.status(500).json({ error: "Error in editing code" });
  }
};

export const deleteCode = async (req: AuthRequest, res: Response) => {
  const userId = req._id;
  const { id } = req.params;
  try {
    const owner = await User.findById(userId);
    if (!owner) {
      return res
        .status(404)
        .send({ message: "Cannot find the owner profile!" });
    }
    const existingCode = await Code.findById(id);
    if (!existingCode) {
      return res.status(404).send({ message: "Code not found" });
    }
    if (existingCode.ownerName !== owner.username) {
      return res
        .status(400)
        .send({ message: "You don't have permission to delete this code!" });
    }
    const deleteCode = await Code.findByIdAndDelete(id);
    if (deleteCode) {
      return res.status(200).send({ message: "Code Deleted successfully!" });
    } else {
      return res.status(404).send({ message: "Code not found" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Error deleting code!", error });
  }
};
