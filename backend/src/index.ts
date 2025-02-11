import express from "express";
import cors from "cors";
import { connectDB } from "./lib/dbConnection";
import { compilerRouter } from "./routes/compilerRoutes";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5174","http://localhost:5173"] ,
    credentials: true, 
  })
);


dotenv.config();
app.use("/compiler", compilerRouter);
app.use("/api/user", userRouter);
connectDB();

app.listen(5000, () => {
  console.log("Server is running at , http://localhost:5000");
});
