// models/Booking.js

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    // Customer details (NO login required)
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    // Optional (if package selected)
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },

    // Required
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    // Trip details
    pickupLocation: {
      type: String,
      required: true,
    },

    dropLocation: {
      type: String,
    },

    distance: {
      type: Number,
      required: true,
      min: 1,
    },

    travelDate: {
      type: Date,
      required: true,
    },

    // Final calculated price
    totalPrice: {
      type: Number,
      required: true,
    },

    // Helps identify pricing logic
    pricingType: {
      type: String,
      enum: ["package", "custom"],
      required: true,
    },

    // Booking lifecycle
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },

    notes: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);