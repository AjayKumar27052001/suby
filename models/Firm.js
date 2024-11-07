const mongoose = require("mongoose");
const Vendor = require("./Vendor");
const Product = require("./Product");

const firmSchema = new mongoose.Schema({
  firmName: {
    type: "String",
    require: true,
    unique: true,
  },
  area: {
    type: "String",
    required: true,
  },
  region: {
    type: {
      type: "String",
      enum: ["NorthIndian", "SouthIndian", "Chinese", "Bakery"],
    },
  },
  category: {
    type: {
      type: "String",
      enum: ["veg", "nonveg"],
    },
  },
  image: {
    type: "String",
  },
  vendor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  offer: {
    type: "String",
  },
});
const firm = mongoose.model("Firm", firmSchema);
module.exports = firm;
