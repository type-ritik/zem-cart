const express = require("express");
const route = express.Router();

const {
  registerSeller,
  loginSeller,
  // getSellerProfile,
} = require("../controllers/SellerAuthController");
// const { authenticate } = require("../middlewares/authMiddleware.js");

route.post("/register", registerSeller);
route.post("/login", loginSeller);
// route.get("/profile", authenticate, getSellerProfile);

module.exports = route;
