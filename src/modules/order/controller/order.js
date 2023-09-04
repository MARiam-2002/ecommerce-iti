import cartModel from "../../../../DB/models/cart.model.js";
import orderModel from "../../../../DB/models/order.model.js";
import productModel from "../../../../DB/models/product.model.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { clearCart, updateStock } from "../order.service.js";

export const createOrder = asyncHandler(async (req, res, next) => {
  const { address, phone } = req.body;
  const cart = await cartModel.findOne({ user: req.user._id });
  
  const products = cart.products;
  if (products.length < 1) return next(new Error("Empty cart!"));
  let orderProducts = [];
  let orderPrice = 0;
  for (let i = 0; i < products.length; i++) {
    const product = await productModel.findById(products[i].productId);
    if (!product)
      return next(new Error(`product ${products[i].productId} not found!`));
    if (!product.inStock(products[i].quantity)) {
      return next(
        new Error(
          `${product.name} out of stock, only ${product.availableItems} items are left`
        )
      );
    }
    orderProducts.push({
      productId: product._id,
      quantity: products[i].quantity,
      name: product.name,
      totalItemPrice: product.price * products[i].quantity,
    });

    orderPrice += product.price * products[i].quantity;
  }

  clearCart(req.user._id);
  const order = await orderModel.create({
    user: req.user._id,
    products: orderProducts,
    address,
    phone,
    totalPrice: orderPrice,
  });
  updateStock(order.products, true);

  return res.json({
    success: true,
    results: order,
    message: "order placed successfully! please check your email!",
  });
});

export const cancelOrder = asyncHandler(async (req, res, next) => {
  const order = await orderModel.findById(req.params.orderId);
  if (!order) return next(new Error("order not found!"));

  order.status = "canceled";
  await order.save();
  updateStock(order.products, false);

  return res.json({
    success: true,
    results: order,
    message: "order canceled successfully!",
  });
});
