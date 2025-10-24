const mongoose = require("mongoose");
require("dotenv").config();

module.exports.MongoDBconfig = async () => {
  // Connect with explicit options and reasonable serverSelectionTimeoutMS so failures surface quickly.
  try {
    // keep a quick timeout so errors surface fast
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to database successfully");
  } catch (err) {
    console.error("MongoDB Connection Error", err);
    throw err; // rethrow so caller can stop server start
  }
};
