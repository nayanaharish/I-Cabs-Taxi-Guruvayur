const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    // Base price (WILL be modified by vehicle multiplier)
    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // Optional route info (for UI display)
    route: {
      from: String,
      to: String,
    },

    // Booking cutoff
    bookingCutoffHours: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Package", packageSchema);