import mongoose from "mongoose";

interface IUserSchema {
  username: string;
  email: string;
  password: string;
}


const UserSchema = new mongoose.Schema<IUserSchema>({
  
username:{
    type: String,
    required: true,
    trim: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password:{
    type: String,
    required: true,
}
},{ timestamps: true });


export const User = mongoose.model("User", UserSchema);