const { pool } = require("../database/connect");

const findUserByEmail = async (email) => {
  try {
    const user = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
    );

    if (user.rowCount !== 0) {
      return user.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Failed to find user: " + error.message);
  }
};

const registerUserRecord = async (name, email, password) => {
  try {
    const users = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *;",
      [name, email, password],
    );

    return users.rows[0];
  } catch (error) {
    throw new Error("Failed to register user records: " + error.message);
  }
};

module.exports = { findUserByEmail, registerUserRecord };
