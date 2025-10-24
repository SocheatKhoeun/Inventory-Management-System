import { io } from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";

let socket = null;

const initializeSocket = () => {
  if (socket) return socket;

  try {
    socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return socket;
  } catch (error) {
    console.error("Failed to initialize socket:", error);
    return null;
  }
};

// Initialize socket on first call
const getSocket = () => {
  if (!socket) {
    initializeSocket();
  }
  return socket;
};

export default getSocket;
export { initializeSocket };
