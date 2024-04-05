import "dotenv/config.js";
import express from "express";
import { connectDB } from "../DB/connectDB.js";
import mainRouter from "../minRouter.js";
const app = express();

app.use(express.json());
await connectDB();

app.use("/v1", mainRouter);
app.all("*", (req, res, next) => {
  return next(new Error("Page Not found", { cause: 404 }));
});

app.use((err, req, res, next) => {
  const statusCode = err.cause || 500;
  const message = err.message || "Something Wrong";

  return res
    .status(statusCode)
    .json({ success: false, message, stack: err.stack });
});

export default app;
