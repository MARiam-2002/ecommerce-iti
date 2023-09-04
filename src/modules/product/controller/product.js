import productModel from "../../../../DB/models/product.model.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

export const createProduct = asyncHandler(async (req, res, next) => {
  let isProduct = await productModel.findOne({
    name: req.body.name,
  });
  if (isProduct) {
    isProduct.availableItems =
      isProduct.availableItems + req.body.availableItems;

    await isProduct.save();
    return res.json({
      success: true,
      results: isProduct,
      message: "product added successfully!",
    });
  } else {
    const product = await productModel.create({
      ...req.body,
      createdBy: req.user._id,
    });
    return res.status(201).json({ success: true, result: product });
  }
});
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await productModel.findById(req.params.productId);
  if (!product) {
    return next(new Error("product not found"));
  }

  if (req.user._id.toString() !== product.createdBy.toString()) {
    return next(new Error("not authorized", { cause: 401 }));
  }

  await productModel.findByIdAndDelete(req.params.productId);
  return res.json({ success: true, message: "product delete successfully!" });
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const products = await productModel.findById(req.params.productId);
  if (!products) {
    return next(new Error("product not found"));
  }
  return res.json({ success: true, result: products });
});
export const get = asyncHandler(async (req, res, next) => {
  const products = await productModel.find();
  return res.json({ success: true, result: products });
});
