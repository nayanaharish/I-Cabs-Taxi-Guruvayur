// controllers/bookingController.js

const Booking = require("../models/Booking");
const Package = require("../models/Package");
const Vehicle = require("../models/Vehicle");
const mongoose = require("mongoose");

/*
|--------------------------------------------------------------------------
| CREATE BOOKING (Public)
|--------------------------------------------------------------------------
| Handles:
| - Package booking
| - Custom booking
| - Price calculation
| - Booking cutoff validation
| - WhatsApp message generation
*/
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

    // Step 2: Validate ObjectIds
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
    let pkg = null; // IMPORTANT: define outside so we can use later

    // Step 5: Package logic
    if (pricingType === "package") {
      if (!packageId) {
        return res.status(400).json({
          message: "Package is required for package booking",
        });
      }

      pkg = await Package.findById(packageId);

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

    // Step 7: Final price calculation
    const totalPrice = basePrice * vehicle.priceMultiplier;

    // Step 8: Save booking in DB
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

    /*
    |--------------------------------------------------------------------------
    | Step 9: Generate WhatsApp Message
    |--------------------------------------------------------------------------
    */

    const message = `
New Booking 🚗

Name: ${name}
Phone: ${phone}

Pickup: ${pickupLocation}
Drop: ${dropLocation || "N/A"}

Vehicle: ${vehicle.name}
Package: ${pkg ? pkg.title : "Custom Ride"}

Price: ₹${totalPrice}
Date: ${travelDate}
`;

    // Replace with client number
    const whatsappNumber = "918589903058";

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Step 10: Send response
    return res.status(201).json({
      message: "Booking created successfully",
      booking,
      whatsappURL, // frontend will use this
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


/*
|--------------------------------------------------------------------------
| GET ALL BOOKINGS (Admin)
|--------------------------------------------------------------------------
*/
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("vehicle")
      .populate("package")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: bookings.length,
      bookings,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


/*
|--------------------------------------------------------------------------
| GET BOOKING BY ID
|--------------------------------------------------------------------------
*/
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("vehicle")
      .populate("package");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    return res.status(200).json({ booking });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


/*
|--------------------------------------------------------------------------
| UPDATE BOOKING STATUS (Admin)
|--------------------------------------------------------------------------
*/
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatus = ["pending", "confirmed", "completed", "cancelled"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    return res.status(200).json({
      message: "Status updated",
      booking,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
};