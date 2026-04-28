// routes/vehicleRoutes.js

const express = require("express");
const router = express.Router();

const { createVehicle, getVehicles } = require("../controllers/VehicleController");

const verifyToken = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/roleMiddleware");

// Admin create
router.post("/", verifyToken, verifyAdmin, createVehicle);

// Public get
router.get("/", getVehicles);

module.exports = router;