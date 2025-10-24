const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✓ Connected to MongoDB successfully");
    return mongoose;
  } catch (err) {
    console.error("✗ MongoDB Connection Error:", err.message);
    throw err;
  }
};

module.exports = { connectDB };
