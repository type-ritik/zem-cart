const express = require("express");
const route = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/UserAuthController.js");
const { authenticate } = require("../middlewares/authMiddleware.js");

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/profile", authenticate, getUserProfile);

module.exports = route;
