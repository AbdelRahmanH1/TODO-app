import { Router } from "express";
import authentication from "../../middleware/authentication.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as controller from "./task.controller.js";
import * as schema from "./task.schema.js";
const router = Router();

router
  .route("/")
  .post(authentication, validation(schema.create), controller.createTask)
  .get(authentication, controller.getAllTask);

router
  .route("/:id")
  .delete(authentication, validation(schema.id), controller.deleteTask)
  .put(authentication, validation(schema.updateTask), controller.updateTask)
  .get(authentication, validation(schema.id), controller.getSpecificTask);

router
  .route("/complete/:id")
  .patch(authentication, validation(schema.id), controller.completedTask);
export default router;
