const { pool } = require("../database/connect");

class ProductRepository {
  constructor() {}

  async getAllProducts() {
    try {
      const response = await pool.query(`SELECT * FROM products LIMIT 5`);

      if (response.rowCount === 0) {
        return null;
      }

      return response.rows;
    } catch (error) {
      console.log("Failed to fetch product: ", error.message);
      throw new Error("Failed to fetch products");
    }
  }

  async getProductById(id) {
    try {
      const payload = await pool.query("SELECT * FROM products WHERE product_id = $1", [
        id,
      ]);

      if (payload.rowCount === 0) {
        return null;
      } else {
        return payload.rows;
      }
    } catch (error) {
      console.log("Failed to fetch product: ", error.message);
      throw new Error("Failed to fetch product");
    }
  }
}

module.exports = ProductRepository;
