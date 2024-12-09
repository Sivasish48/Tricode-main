import express from "express";
import cors from "cors";
import { connectDB } from "./lib/dbConnection";
import { config } from "dotenv";
import { compilerRouter } from "./routes/compilerRoutes";
import userRouter from "./routes/userRoutes";
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
import dotenv from "dotenv";
dotenv.config();
app.use("/compiler", compilerRouter);
app.use("/api/user", userRouter);
connectDB();


app.listen(5000, () => {
  console.log("Server is running at , http://localhost:5000");
});
