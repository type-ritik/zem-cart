const ProductServices = require("../services/ProductService");

const productService = new ProductServices();

class ProductController {
  async getAllProducts(req, res) {
    try {
      const payload = await productService.retriveAllProducts();

      if (!payload) {
        return res.status(404).json({ error: "No products found" });
      }
      return res.status(200).json({
        payload,
        statusCode: 200,
        message: "Products retrieved successfully",
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async getProductById(req, res) {
    try {
      const { productId } = req.params;
      const payload = await productService.retriveProductByProductId(productId);

      if (!payload) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json({
        payload,
        statusCode: 200,
        message: "Product retrieved successfully",
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = ProductController;
