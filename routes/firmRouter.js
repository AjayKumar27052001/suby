const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const firmController = require("../controllers/firmController");
const path = require("path");
const router = express.Router();
router.post("/add-firm", verifyToken, firmController.addFirm);
router.delete(
  "/delete-firm/:firmId",
  verifyToken,
  firmController.deleteFirmById
);
router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.header("content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});

module.exports = router;
