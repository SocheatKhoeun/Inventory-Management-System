const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: { type: String, required: true },
    description: { type: String },
    entity: { type: String },
    entityId: { type: mongoose.Schema.Types.ObjectId },
    ipAddress: { type: String },
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;
