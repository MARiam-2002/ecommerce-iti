import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.middleware.js";

export const createProduct = joi
  .object({
    name: joi.string().min(2).max(20).required(),
    description: joi.string(),
    availableItems: joi.number().min(1).required(),
    price: joi.number().min(1).required(),
  })
  .required();

export const productId = joi
  .object({
    productId: joi.string().custom(isValidObjectId),
  })
  .required();
