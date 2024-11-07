const Vendor = require("../models/Vendor");
const multer = require("multer");
const path = require("path");
const Firm = require("../models/Firm");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
});
const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;
    console.log(`${firmName}""${area}`);
    const image = req.file ? req.file.filename : undefined;
    console.log("image created");
    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) return res.status(404).json({ message: "vendor not found" });
    else console.log(vendor);
    if (vendor.firm.length > 10)
      return res.status(400).json({ message: "Vendor can only have one firm" });
    console.log("vendor having no firm");
    const newFirm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });
    console.log(newFirm);
    const savedFirm = await newFirm.save();
    console.log("savedFirm");
    const firmId = savedFirm._id;
    const vendorFirmName = savedFirm.firmName;
    vendor.firm.push(savedFirm);
    await vendor.save();
    return res
      .status(200)
      .json({ message: "suceesfully firm saved under vendor" });
  } catch (error) {
    console.log("server error at firm saving from vendor");
    return res.status(500).json({ message: "internal server error" });
  }
};

const deleteFirmById = async (req, res) => {
  try {
    const firmId = req.params.firmId;

    const deletedProduct = await Firm.findByIdAndDelete(firmId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "No product found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { addFirm: [upload.single("image"), addFirm], deleteFirmById };
