import { Router } from "express";
import taskRouter from "./modules/task/task.router.js";
import userRouter from "./modules/user/user.router.js";

const mainRouter = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/task", taskRouter);
export default mainRouter;
