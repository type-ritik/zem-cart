const express = require("express");
const route = express.Router();

const ProductController = require("../controllers/ProductController");
const productController = new ProductController();

route.get("/", productController.getAllProducts);
route.get("/:productId", productController.getProductById);

module.exports = route;
