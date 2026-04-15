const ProductRepository = require("../repository/ProductRepository");

class ProductServices {
  constructor() {
    this.product = new ProductRepository();
  }

  async retriveAllProducts() {
    try {
      const payload = await this.product.getAllProducts();

      if (!payload) {
        throw new Error("No products found");
      }

      return payload;
    } catch (error) {
      throw new Error("Failed to get products: ", error.message);
    }
  }

  async retriveProductByProductId(product_id) {
    try {
      const payload = await this.product.getProductById(product_id);

      if (!payload) {
        throw new Error("Product not found");
      }
      return payload;
    } catch (error) {
      throw new Error("Failed to get products: ", error.message);
    }
  }
}

module.exports = ProductServices;
