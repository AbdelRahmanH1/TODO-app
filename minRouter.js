import { Router } from "express";
import taskRouter from "./src/modules/task/task.router.js";
import userRouter from "./src/modules/user/user.router.js";

const mainRouter = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/task", taskRouter);
export default mainRouter;
