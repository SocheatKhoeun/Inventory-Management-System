const express = require("express");
const http = require("http");
require("dotenv").config();

// Config imports
const { connectDB } = require("./config/database");
const { initializeSocket } = require("./config/socketio");
const { setupMiddleware } = require("./config/middleware");
const { loadModels } = require("./config/models");
const { setupRoutes, setupActivityRoutes } = require("./config/routes");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

const io = initializeSocket(server);
app.set("io", io);

setupMiddleware(app);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "Server is running" });
});

const gracefulShutdown = () => {
  console.log("Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Load models
    loadModels();

    // Setup routes
    setupRoutes(app);
    setupActivityRoutes(app);

    // Start server
    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(
        `✓ Frontend URL: ${
          process.env.FRONTEND_URL || "http://localhost:3000"
        }`
      );
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

// Start the server
startServer();

module.exports = { io, server, app };
