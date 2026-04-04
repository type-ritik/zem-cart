const { generateToken } = require("../configs/jwtConfig");
const { hashPassword } = require("../configs/passwordEncoder");
const {
  findUserByEmail,
  registerUserRecord,
} = require("../repository/UserRepository");

const createUser = async (name, email, password) => {
  try {
    const isRegisteredEmail = await findUserByEmail(email);

    if (isRegisteredEmail) {
      throw new Error("Email is already registered");
    }

    const hashedPassword = await hashPassword(password);

    if (!hashedPassword) {
      throw new Error("Failed to hash password");
    }

    const registered = await registerUserRecord(name, email, hashedPassword);

    if (!registered) {
      throw new Error("Failed to register user");
    }

    const token = generateToken(registered.user_id, registered.is_admin);

    if (!token) {
      throw new Error("Failed to generate token");
    }

    return {
      user: {
        id: registered.user_id,
        name: registered.name,
        email: registered.email,
        isAdmin: registered.is_admin,
        createdAt: registered.created_at,
      },
      token: token,
    };
  } catch (error) {
    throw new Error("Failed to create user: " + error.message);
  }
};

module.exports = { createUser };
