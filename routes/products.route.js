const express = require("express");
const { ProductModel } = require("../model/product.model");
const jwt = require("jsonwebtoken");
const productRouter = express.Router();

// restricted the routes using jwt
productRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "e-comm");
  try {
    const products = await ProductModel.find({ userID: decoded.userID });
    res.send(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

productRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ProductModel.find({ _id: id });
    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

productRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const product = new ProductModel(payload);
    await product.save();
    res.send("Product has been added to the database.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

productRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await ProductModel.findByIdAndDelete({ _id: id });
    res.send("Product has been deleted successfully.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

productRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    await ProductModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("Product data has been updated successfully.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = { productRouter };
