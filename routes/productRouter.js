const express = require("express");
const router = express.Router();
const path = require("path");

const {
  addProduct,
  getProductByFirm,
  deleteProductById,
} = require("../controllers/productController");
router.post("/addProduct/:firmId", addProduct);
router.post("/deleteProduct/:productId", deleteProductById);
router.get("/getproduct/:firmId", getProductByFirm);
router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.header("content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});

module.exports = router;
