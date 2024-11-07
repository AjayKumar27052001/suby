const express = require("express");
const path = require("path");

const {
  vendorRegistration,
  vendorLogin,
  getAllVendors,
  getSingleVendor,
} = require("../controllers/vendorController");

const router = express.Router();
router.post("/vendorRegistration", vendorRegistration);
router.post("/vendorLogin", vendorLogin);
router.get("/allVendors", getAllVendors);
router.get("/getSingleVendor/:apple", getSingleVendor);

module.exports = router;
