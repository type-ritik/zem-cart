const express = require("express");
const route = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/UserAuthController.js");
const { authenticateSeller } = require("../middlewares/authMiddleware.js");

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/profile", authenticateSeller, getUserProfile);

module.exports = route;
