const express = require("express");
const app = express();
const port = 4000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const vendorrouter = require("./routes/vendorRouter");
const firmRouter = require("./routes/firmRouter");
const productRouter = require("./routes/productRouter");
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db connected sucessfully"))
  .catch((error) => console.log(error));

app.use("/", (req, res) => {
  res.send("welcome to suby");
});
app.use("/vendor", vendorrouter);
app.use("/firm", firmRouter);
app.use("/products", productRouter);
app.use("/uploads", express.static("/uploads"));
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
