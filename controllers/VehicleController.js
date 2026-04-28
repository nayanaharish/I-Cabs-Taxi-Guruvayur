// controllers/vehicleController.js

const Vehicle = require("../models/Vehicle");

const createVehicle = async (req, res) => {
  try {
    const { name, type, priceMultiplier } = req.body;

    // Validation
    if (!name || !type || !priceMultiplier) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Create vehicle
    const vehicle = await Vehicle.create({
      name,
      type,
      priceMultiplier,
    });

    return res.status(201).json({
      message: "Vehicle created successfully",
      vehicle,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ isActive: true });

    return res.status(200).json({
      vehicles,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


module.exports = {createVehicle,getVehicles};