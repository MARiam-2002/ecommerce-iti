import mongoose, { Schema, Types, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 20,
      required: true,
    },
    description: String,

    availableItems: {
      type: Number,
      min: 1,
      required: true,
    },

    price: {
      type: Number,
      min: 1,
      required: true,
    },

    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
productSchema.methods.inStock = function (requiredQuantity) {
  return this.availableItems >= requiredQuantity ? true : false;
};
const productModel =
  mongoose.models.productModel || model("Product", productSchema);
export default productModel;
