import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isValidation } from "../../middleware/validation.middleware.js";
import * as validators from "./order.validation.js";
import * as orderController from "./controller/order.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
const router = Router();

router.post(
  "/",
  isAuthenticated,
  isAuthorized("user"),
  isValidation(validators.createOrder),
  orderController.createOrder
);

router.patch(
  "/:orderId",
  isAuthenticated,
  isAuthorized("user"),
  isValidation(validators.cancelOrder),
  orderController.cancelOrder
);
export default router;
