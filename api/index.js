import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import AuthRoute from "./routes/Auth-Route.js";
import UserRoute from "./routes/User-Route.js";
import CategoryRoute from "./routes/Category-Route.js";
import BlogRoute from "./routes/Blog-Route.js";
import CommentRoute from "./routes/Comment-Route.js";
import BlogLikeRoute from "./routes/BlogLike-Route.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

//Route Setup
app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/blog", BlogRoute);
app.use("/api/comment", CommentRoute);
app.use("/api/blog-like", BlogLikeRoute);

//Database Connection
mongoose
  .connect(process.env.MONGODB_CONN, { dbName: "InfoBridge-Blog" })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Database connection failed...", err);
  });

//Server Running
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//Middleware to handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});
