// models/Vehicle.js

const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["sedan", "suv", "luxury"], // restrict allowed values
      required: true,
    },

    priceMultiplier: {
      type: Number,
      required: true,
      min: 1, // cannot be less than base price
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

module.exports = mongoose.model("Vehicle", vehicleSchema);