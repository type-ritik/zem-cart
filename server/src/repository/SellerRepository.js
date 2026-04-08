const { pool } = require("../database/connect");

const findSellerBySellerEmail = async (email) => {
  try {
    const payload = await pool.query(
      "SELECT * FROM sellers WHERE  seller_email = $1;",
      [email],
    );

    if (payload.rowCount === 0) {
      return null;
    } else {
      return payload.rows[0];
    }
  } catch (error) {
    throw new Error("Database query failed");
  }
};

const createSellerRecord = async (name, email, phone, password) => {
  try {
    const payload = await pool.query(
      `
            INSERT INTO sellers (seller_name, seller_email, seller_phone, seller_password) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [name, email, phone, password],
    );

    if (payload.rowCount === 0) {
      return null;
    } else {
      return payload.rows[0];
    }
  } catch (error) {
    throw new Error("Database query failed");
  }
};

const findSellerByPhone = async (phone) => {
  try {
    const payload = await pool.query(
      `SELECT * FROM sellers WHERE seller_phone = $1;`,
      [phone],
    );

    if (payload.rowCount === 0) {
      return null;
    } else {
      return payload.rows[0];
    }
  } catch (error) {
    throw new Error("Database query failed");
  }
};

module.exports = {
  findSellerBySellerEmail,
  createSellerRecord,
  findSellerByPhone,
};
