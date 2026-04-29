const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["sedan", "suv", "luxury"],
      required: true,
    },

    priceMultiplier: {
      type: Number,
      required: true,
      min: 1,
    },

    baseFare: {
      type: Number,
      default: 0,
      min: 0,
    },

    seatingCapacity: {
      type: Number,
      required: true,
      min: 1,
    },

    image: {
      type: String,
    },

    amenities: [String],

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