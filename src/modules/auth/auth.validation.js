import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.middleware.js";

export const registerSchema = joi
  .object({
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    address: joi.string().required(),
    role: joi.string(),
    userName: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .required(),
    phone: joi.string().regex(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/),
    confirmPassword: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .valid(joi.ref("password"))
      .required(),
  })
  .required();

export const login = joi
  .object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .required(),
  })
  .required();

export const idUser = joi
  .object({
    idUser: joi.string().custom(isValidObjectId)
  })
  .required();
