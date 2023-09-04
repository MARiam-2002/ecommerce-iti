import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import * as productController from "../product/controller/product.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import * as validators from "./product.validation.js";
import { isValidation } from "../../middleware/validation.middleware.js";
const router = Router({ mergeParams: true });

router.post(
  "/createProduct",
  isAuthenticated,
  isAuthorized("admin"),
  isValidation(validators.createProduct),
  productController.createProduct
);
router.delete(
  "/deleteProduct/:productId",
  isAuthenticated,
  isAuthorized("admin"),
  isValidation(validators.productId),
  productController.deleteProduct
);

router.get(
  "/single/:productId",
  isValidation(validators.productId),
  productController.getProduct
);
router.get(
  "/",
  productController.get
);
export default router;
