import mongoose, { Schema, Types, model } from "mongoose";

export const orderSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    products: [
      {
        _id: false,
        productId: { type: Types.ObjectId, ref: "Product" },
        quantity: { type: Number, min: 1 },
        name: String,
        totalItemPrice: Number,
      },
    ],
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "placed",
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.models.orderModel || model("Order", orderSchema);
export default orderModel;
