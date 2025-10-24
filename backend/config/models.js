const mongoose = require("mongoose");

const models = {};

const loadModels = () => {
  try {
    const modelNames = [
      "Category",
      "Product",
      "Activity",
      "ActivityLog",
      "User",
      "Order",
      "Sale",
      "Notification",
      "Supplier",
      "StockTransaction",
    ];

    modelNames.forEach((modelName) => {
      try {
        if (mongoose.modelNames().includes(modelName)) {
          models[modelName] = mongoose.model(modelName);
        } else {
          // Dynamically require models based on naming convention
          const modelFile = modelName + "model";
          models[modelName] = require(`../models/${modelFile}`);
        }
      } catch (err) {
        console.warn(`⚠ Model ${modelName} not found:`, err.message);
      }
    });

    console.log("✓ Models loaded successfully");
    return models;
  } catch (err) {
    console.error("✗ Failed to load models:", err.message);
    throw err;
  }
};

module.exports = { loadModels, models };
