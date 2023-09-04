import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.middleware.js";

export const createOrder = joi
  .object({
    address: joi.string().min(10).required(),
    phone: joi
      .string()
      .regex(/^(01|00201)[0-2,5]{1}[0-9]{8}/)
      .length(11)
      .required(),
  })
  .required();

export const cancelOrder = joi
  .object({
    orderId: joi.string().custom(isValidObjectId).required(),
  })
  .required();
