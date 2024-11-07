const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");

dotenv.config();
const secretkey = process.env.secretKey;
const vendorRegistration = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    console.log(email);
    const userfound = await Vendor.findOne({ email });
    if (userfound) {
      return res.status(200).json({ message: "email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let newVendor = new Vendor({
      username,
      email,
      password: hashedPassword,
    });
    await newVendor.save();
    res.status(201).json({ message: "vendor record saved sucessfully" });
    console.log("registered");
  } catch (error) {
    res.status(500).json({ message: "server error" });
    console.log(error);
  }
};
const vendorLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Vendor.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ message: "error in the username or password" });
    }
    const userToken = jwt.sign({ vendorId: user._id }, secretkey, {
      expiresIn: "1hr",
    });

    return res.status(200).json({ message: "login sucessful", userToken });
  } catch (error) {
    console.log("server error", error);
    return res.status(500).json({ message: "server error" });
  }
};
const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("firm");
    return res.json({ vendors });
  } catch (error) {
    console.log("internal server error is", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const getSingleVendor = async (req, res) => {
  const vendor_Id = req.params.apple;
  try {
    const singleVendor = await Vendor.findById(vendor_Id).populate("firm");
    if (!singleVendor) {
      return res.status(404).json({ message: "Vendor Id not found" });
    }
    return res.json({ singleVendor });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
module.exports = {
  vendorRegistration,
  vendorLogin,
  getAllVendors,
  getSingleVendor,
};
