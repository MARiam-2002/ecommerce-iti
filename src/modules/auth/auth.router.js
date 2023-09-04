import { Router } from "express";
import * as Validators from "./auth.validation.js";
import { isValidation } from "../../middleware/validation.middleware.js";
import * as userController from "./controller/auth.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
const router = Router();

router.post(
  "/register",
  isValidation(Validators.registerSchema),
  userController.register
);

router.post("/login", isValidation(Validators.login), userController.login);
router.delete(
  "/:idUser",
  isAuthenticated,
  isAuthorized("admin"),
  isValidation(Validators.idUser),
  userController.deleted
);

router.get(
  "/:idUser",
  isAuthenticated,
  isAuthorized("admin"),
  isValidation(Validators.idUser),
  userController.getById
);
router.get("/", isAuthenticated, isAuthorized("admin"), userController.get);
export default router;
