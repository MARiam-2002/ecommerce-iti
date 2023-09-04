import authRouter from "./modules/auth/auth.router.js";
import productRouter from "./modules/product/product.router.js";
import cartRouter from "./modules/cart/cart.router.js";
import orderRouter from "./modules/order/order.router.js";

import morgan from "morgan";
import { globalErrorHandling } from "./utils/asyncHandler.js";

export const bootstrap = (app, express) => {
  if (process.env.NODE_ENV == "dev") {
    app.use(morgan("common"));
  }
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/product", productRouter);
  app.use("/cart", cartRouter);
  app.use("/order", orderRouter);
  app.all("*", (req, res, next) => {
    return next(new Error("not found page", { cause: 404 }));
  });

  app.use(globalErrorHandling);
};
