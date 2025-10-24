const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const setupMiddleware = (app) => {
  // CORS middleware
  app.use(
    cors({
      origin: FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  // Body parser middleware
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));

  // Cookie parser middleware
  app.use(cookieParser());

  console.log("✓ Middleware configured successfully");
};

module.exports = { setupMiddleware };
