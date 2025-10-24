const { Server } = require("socket.io");
require("dotenv").config();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`✓ User connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`✗ User disconnected: ${socket.id}`);
    });
  });

  return io;
};

module.exports = { initializeSocket };
