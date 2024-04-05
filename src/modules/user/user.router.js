import { Router } from "express";
import authentication from "../../middleware/authentication.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as controller from "./user.controller.js";
import * as schema from "./user.schema.js";
const router = Router();
router
  .route("/signup")
  .post(validation(schema.signUp), controller.createAccount);

router
  .route("/update")
  .put(authentication, validation(schema.editAccount), controller.editAccount);

router.route("/login").post(validation(schema.login), controller.login);

router.route("/delete").delete(authentication, controller.deleteAccount);
export default router;
