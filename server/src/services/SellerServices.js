const { generateToken, generateSellerToken } = require("../configs/jwtConfig");
const { hashPassword, comparePassword } = require("../configs/passwordEncoder");
const {
  findSellerBySellerEmail,
  findSellerByPhone,
  createSellerRecord,
} = require("../repository/SellerRepository");

const signupSeller = async (name, email, phone, password) => {
  try {
    const isSellerWithEmailExists = await findSellerBySellerEmail(email);

    if (isSellerWithEmailExists) {
      throw new Error("Seller is already registered");
    }

    const isSellerPhoneExists = await findSellerByPhone(phone);

    if (isSellerPhoneExists) {
      throw new Error("Seller is already registered with this phone number");
    }

    const hashedPassword = await hashPassword(password);

    if (!hashedPassword) {
      throw new Error("Failed to hash password");
    }

    const payload = await createSellerRecord(
      name,
      email,
      phone,
      hashedPassword,
    );

    if (!payload) {
      throw new Error("Failed to create seller record");
    }

    const token = generateSellerToken(payload.seller_id);

    if (!token) {
      throw new Error("Failed to generate token");
    }

    return {
      seller: {
        id: payload.seller_id,
        name: payload.seller_name,
        email: payload.seller_email,
        phone: payload.seller_phone,
        createdAt: payload.created_at,
      },
      token,
    };
  } catch (error) {
    throw new Error("Failed to register seller: " + error.message);
  }
};

const logSeller = async (email, password) => {
  try {
    const isSellerWithEmailExists = await findSellerBySellerEmail(email);

    if (!isSellerWithEmailExists) {
      throw new Error("Seller is not registered");
    }

    const isValidPassword = await comparePassword(
      password,
      isSellerWithEmailExists.seller_password,
    );

    if (!isValidPassword) {
      throw new Error("Incorrect password");
    }

    const token = generateSellerToken(isSellerWithEmailExists.seller_id);

    if (!token) {
      throw new Error("Failed to generate token");
    }

    return {
      seller: {
        id: isSellerWithEmailExists.seller_id,
        name: isSellerWithEmailExists.seller_name,
        email: isSellerWithEmailExists.seller_email,
        phone: isSellerWithEmailExists.seller_phone,
        createdAt: isSellerWithEmailExists.created_at,
      },
      token,
    };
  } catch (error) {
    throw new Error("Failed to login seller: " + error.message);
  }
};

module.exports = {
  signupSeller,
  logSeller,
};
