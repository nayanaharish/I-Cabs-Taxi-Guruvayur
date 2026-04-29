const express = require("express");
const router = express.Router();

// Import controller
const { createBooking } = require("../controllers/bookingController");

// Public route (no login required)
router.post("/", createBooking);

module.exports = router;