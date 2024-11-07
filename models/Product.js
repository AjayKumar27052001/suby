const mongoose = require("mongoose");
const Firm = require("./Firm");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: [
      {
        type: String,
        enum: ["Veg", "Nonveg"],
      },
    ],
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  firm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Firm",
  },
});
const product = mongoose.model("Product", productSchema);
module.exports = product;
