const { signupSeller, logSeller } = require("../services/SellerServices");
const validator = require("../configs/validator");

const registerSeller = async (req, res) => {
  try {
    console.log("Received registration request");

    const { name, email, phone, password } = req.body;

    if (name.length < 4) {
      console.log("Validation failed: Name must be at least 4 characters long");
      return res.status(400).json({
        error: "Name must be at least 4 characters long",
      });
    }

    if (!validator.isAlpha(name)) {
      console.log("Validation failed: Name must contain only letters");
      return res.status(400).json({ error: "Name must contain only letters" });
    }

    if (!validator.isEmail(email)) {
      console.log("Validation failed: Invalid email format");
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!validator.isMobilePhone(phone, "en-IN")) {
      console.log("Validation failed: Invalid phone number format");
      return res.status(400).json({ error: "Invalid phone number format" });
    }

    if (!validator.isStrongPassword(password)) {
      console.log(
        "Validation failed: Password does not meet strength requirements",
      );

      return res.status(400).json({
        error:
          "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols",
      });
    }

    const payload = await signupSeller(name, email, phone, password);

    res.cookie("token", payload.token, {
      httpOnly: true, // Makes the cookie inaccessible to client-side scripts
      secure: process.env.NODE_ENV === "development", // Ensure the cookie is sent over HTTPS in production
      sameSite: "none",
      partitioned: true,
      maxAge: 60 * 1000,
    });

    // Register a new seller
    res.status(201).json({
      payload,
      statusCode: 201,
      message: "Seller registered successfully",
    });
  } catch (error) {
    console.log("Error occurred during seller registration: " + error.message);
    res.status(500).json({ error: "Failed to register seller" });
  }
};

const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols",
      });
    }

    const payload = await logSeller(email, password);

    res.cookie("token", payload.token, {
      httpOnly: true, // Makes the cookie inaccessible to client-side scripts
      secure: process.env.NODE_ENV === "development", // Ensure the cookie is sent over HTTPS in production
      sameSite: "none",
      partitioned: true,
      maxAge: 60 * 1000,
    });

    return res.status(200).json({
      payload,
      statusCode: 200,
      message: "Seller logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to login seller" });
  }
};

const getSellerProfile = async (req, res) => {
  try {
    // Logic to get seller profile using req.sellerId
    res.status(200).json({ message: "Seller profile retrieved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve seller profile" });
  }
};

module.exports = {
  registerSeller,
  loginSeller,
  getSellerProfile,
};
