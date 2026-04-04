const validator = require("../configs/validator");
const { createUser } = require("../services/UserServices");

const registerUser = async (req, res) => {
  try {
    // Register a new seller
    const { name, email, password } = req.body;

    if (!validator.isAlpha(name)) {
      return res.status(400).json({ error: "Name must contain only letters" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Password must be strong" });
    }

    const payload = await createUser(name, email, password);

    if (!payload) {
      return res.status(500).json({ error: "Failed to register user" });
    }

    res.status(201).json({
      payload,
      statusCode: 201,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    // Register a new seller
    res.status(201).json({ message: "User login successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserProfile = async (req, res) => {
  try {
    // Register a new seller
    res.status(201).json({ message: "User profile retrieved successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
