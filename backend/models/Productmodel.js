const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    Desciption: { type: String },
    Category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    Price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 },
    dateAdded: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
