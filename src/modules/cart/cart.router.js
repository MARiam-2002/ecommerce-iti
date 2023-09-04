import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import * as cartController from "./controller/cart.js";
import { isValidation } from "../../middleware/validation.middleware.js";
import * as validators from "./cart.validation.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
const router = Router();

router.post(
  "/",
  isAuthenticated,
  isAuthorized("user"),
  isValidation(validators.cartSchema),
  cartController.addProductInCart
);
router.get("/", isAuthenticated, cartController.getProductInCart);

router.patch(
  "/clear",
  isAuthenticated,
  isAuthorized("user"),
  cartController.clearCart
);

router.patch(
  "/:productId",
  isAuthenticated,
  isAuthorized("user"),

  isValidation(validators.removeProductFromCart),
  cartController.removeProductFromCart
);
router.patch(
  "/",
  isAuthenticated,
  isAuthorized("user"),
  isValidation(validators.cartSchema),
  cartController.updateCart
);

export default router;
