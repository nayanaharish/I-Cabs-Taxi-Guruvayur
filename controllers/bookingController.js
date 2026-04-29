const Booking = require("../models/Booking");
const Package = require("../models/Package");
const Vehicle = require("../models/Vehicle");
const mongoose = require("mongoose");

const createBooking = async (req, res) => {
  try {
    const {
      name,
      phone,
      packageId,
      vehicleId,
      pickupLocation,
      dropLocation,
      distance,
      travelDate,
      pricingType,
    } = req.body;

    // Step 1: Basic validation
    if (!name || !phone || !vehicleId || !pickupLocation || !travelDate || !pricingType) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    // Step 2: Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: "Invalid vehicle ID" });
    }

    if (packageId && !mongoose.Types.ObjectId.isValid(packageId)) {
      return res.status(400).json({ message: "Invalid package ID" });
    }

    // Step 3: Validate pricingType
    if (!["package", "custom"].includes(pricingType)) {
      return res.status(400).json({
        message: "Invalid pricing type",
      });
    }

    // Step 4: Fetch vehicle
    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle || !vehicle.isActive) {
      return res.status(404).json({
        message: "Vehicle not available",
      });
    }

    let basePrice = 0;

    // Step 5: Package logic
    if (pricingType === "package") {
      if (!packageId) {
        return res.status(400).json({
          message: "Package is required for package booking",
        });
      }

      const pkg = await Package.findById(packageId);

      if (!pkg || !pkg.isActive) {
        return res.status(404).json({
          message: "Package not found",
        });
      }

      basePrice = pkg.basePrice;

      // Booking cutoff validation
      const travelTime = new Date(travelDate);
      const cutoffTime = new Date(
        travelTime.getTime() - pkg.bookingCutoffHours * 60 * 60 * 1000
      );

      if (new Date() > cutoffTime) {
        return res.status(400).json({
          message: "Booking closed for this package",
        });
      }
    }

    // Step 6: Custom ride logic
    if (pricingType === "custom") {
      if (!distance) {
        return res.status(400).json({
          message: "Distance is required for custom booking",
        });
      }

      const perKmRate = 12; // can move to config later

      basePrice = distance * perKmRate;
    }

    // Step 7: Calculate final price
    const totalPrice = basePrice * vehicle.priceMultiplier;

    // Step 8: Save booking
    const booking = await Booking.create({
      name,
      phone,
      package: packageId || null,
      vehicle: vehicleId,
      pickupLocation,
      dropLocation,
      distance,
      travelDate,
      totalPrice,
      pricingType,
    });

    // Step 9: Response
    return res.status(201).json({
      message: "Booking created successfully",
      booking,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { createBooking };