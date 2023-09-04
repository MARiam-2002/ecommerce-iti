import cartModel from "../../../../DB/models/cart.model.js";
import userModel from "../../../../DB/models/user.model.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, userName, address, email, role, password } =
    req.body;
  const isUser = await userModel.findOne({ email });
  if (isUser) {
    return next(new Error("email already registered !", { cause: 409 }));
  }

  const hashPassword = bcryptjs.hashSync(
    password,
    Number(process.env.SALT_ROUND)
  );

  const user = await userModel.create({
    firstName,
    lastName,
    userName,
    address,
    email,
    role,
    password: hashPassword,
  });
  if (user.role === "user") {
    await cartModel.create({ user: user._id });
  }
  return res.json({ success: true, results: user });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return next(new Error("Invalid-Email", { cause: 400 }));
  }

  const match = bcryptjs.compareSync(password, user.password);

  if (!match) {
    return next(new Error("Invalid-Password", { cause: 400 }));
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.TOKEN_KEY,
    { expiresIn: "2d" }
  );

  user.status = "online";
  await user.save();

  return res.json({ success: true, result: token });
});

export const deleted = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOne({
    _id: req.params.idUser,
    role: "user",
  });
  if (!user) {
    return next(new Error("Invalid-userId", { cause: 400 }));
  }
  await userModel.findByIdAndDelete(req.params.idUser);
  await cartModel.findOneAndDelete({ user: req.params.idUser });
  return res.json({ success: true, message: "user deleted successfully!" });
});

export const get = asyncHandler(async (req, res, next) => {
  const users = await userModel.find({ role: "user" }).populate("orders");
  return res.json({ success: true, results: users });
});
export const getById = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOne({
    _id: req.params.idUser,
    role: "user",
  }).populate("orders");
  if (!user) {
    return next(new Error("Invalid-userId", { cause: 400 }));
  }
  return res.json({ success: true, result: user });
});
