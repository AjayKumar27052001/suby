const express = require("express");

const app = express();
const mongoose = require("mongoose");
const Firm = require("./firm");

const vendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firm",
    },
  ],
});
const vendor = mongoose.model("Vendor", vendorSchema);
module.exports = vendor;
