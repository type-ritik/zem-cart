const jwt = require("jsonwebtoken");

const generateToken = (user_id, is_admin) => {
  return jwt.sign(
    {
      user: {
        id: user_id,
        isAdmin: is_admin,
      },
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    },
  );
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token: " + error.message);
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
