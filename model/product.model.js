const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    brand: String,
    category: String,
    gender: String,
    price: Number,
    rating: Number,
    userID: String,
  },
  { versionKey: false }
);

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
