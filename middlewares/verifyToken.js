const Vendor = require("../models/Vendor");
const dotEnv = require("dotenv");
const jwt = require("jsonwebtoken");
dotEnv.config();
const secretKey = process.env.secretKey;
const verifyToken = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    console.log("token not found");
    return res.status(401).json({ message: "token not found" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    const vendor = await Vendor.findById(decoded.vendorId);
    if (!vendor) {
      console.log("vendor not found");
      return res.status(404).json({ message: "vendor not found" });
    }
    req.vendorId = vendor._id;
    next();
  } catch (error) {
    console.error("error is", error);
    return res.status(500).json({ message: "server error" });
  }
};
module.exports = { verifyToken };
