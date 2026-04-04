const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

async function startServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //   app.use("/api", userRoutes);
  //   app.use("/auth", authRoutes);

  app.get("/", (req, res) => {
    res.json({
      message: "Welcome to the API",
    });
  });

  return app;
}

module.exports = { startServer };
