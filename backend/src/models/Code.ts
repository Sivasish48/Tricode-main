import mongoose, { Schema, Document } from "mongoose";
import { string } from "zod";

// Define the interface for the code schema
interface ICodeSchema extends Document {
  _id: mongoose.Types.ObjectId;
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  };
  title: string;
  ownerInfo: mongoose.Types.ObjectId | string;
  ownerName: string;
}

// Define the schema
const codeSchema = new mongoose.Schema<ICodeSchema>({
  fullCode: {
    html: { type: String   },
    css: { type: String   },
    javascript: { type: String   }
  },
  title: { type: String, required: true },
  ownerInfo:{type: Schema.Types.ObjectId, ref: "User"},
  ownerName: String,
});

// Create the model using the schema and export it
export const Code = mongoose.model("Code", codeSchema);
