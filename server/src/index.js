const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const { client } = require("./database/connect");

const sellerAuthRoutes = require("./routers/SellerAuthRoutes")
const userAuthRoutes = require("./routers/UserAuthRoutes")

async function startServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  await client
    .connect()
    .then(() => {
      console.log("Connected to PostgreSQL database");
    })
    .catch((error) => {
      console.error("Failed to connect to PostgreSQL database", error);
    });

  app.use("/api/seller/auth", sellerAuthRoutes);
  app.use("/api/user/auth", userAuthRoutes);

  app.get("/", (req, res) => {
    res.json({
      message: "Welcome to the API",
    });
  });

  return app;
}

module.exports = { startServer };
