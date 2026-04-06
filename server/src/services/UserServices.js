const { generateToken } = require("../configs/jwtConfig");
const { hashPassword, comparePassword } = require("../configs/passwordEncoder");
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

const logUser = async (email, password) => {
  try {
    const isRegisteredEmail = await findUserByEmail(email);

    if (!isRegisteredEmail) {
      throw new Error("Email is not registered");
    }

    const isValidPassword = await comparePassword(password, isRegisteredEmail.password_hash);

    if (!isValidPassword) {
      throw new Error("Incorrect password");
    }

    console.log(isRegisteredEmail);

    const token = generateToken(
      isRegisteredEmail.user_id,
      isRegisteredEmail.is_admin,
    );

    if (!token) {
      throw new Error("Failed to generate token");
    }

    return {
      user: {
        id: isRegisteredEmail.user_id,
        name: isRegisteredEmail.name,
        email: isRegisteredEmail.email,
        isAdmin: isRegisteredEmail.is_admin,
        createdAt: isRegisteredEmail.created_at,
      },
      token: token,
    };
  } catch (error) {
    throw new Error("Failed to login user: " + error.message);
  }
};

module.exports = { createUser, logUser };
