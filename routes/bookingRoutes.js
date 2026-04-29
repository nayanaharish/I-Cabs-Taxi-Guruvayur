const express = require("express");
const router = express.Router();

// Import controllers
const {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus
} = require("../controllers/bookingController");

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

// Create booking (customer)
router.post("/", createBooking);


/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
*/

// Get all bookings
router.get("/", getBookings);

// Get single booking by ID
router.get("/:id", getBookingById);

// Update booking status
router.patch("/:id/status", updateBookingStatus);

module.exports = router;