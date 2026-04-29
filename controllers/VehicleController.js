// controllers/vehicleController.js

const Vehicle = require("../models/Vehicle");

/*
|--------------------------------------------------------------------------
| CREATE VEHICLE (Admin)
|--------------------------------------------------------------------------
| Adds new vehicle with pricing multiplier
*/
const createVehicle = async (req, res) => {
  try {
    const { name, type, priceMultiplier } = req.body;

    // Step 1: Validate required fields
    if (!name || !type || priceMultiplier === undefined) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Step 2: Validate priceMultiplier (convert + check)
    const multiplier = Number(priceMultiplier);

    if (isNaN(multiplier) || multiplier < 1) {
      return res.status(400).json({
        message: "priceMultiplier must be a number greater than or equal to 1",
      });
    }

    // Step 3: Validate vehicle type (extra safety)
    const validTypes = ["sedan", "suv", "luxury"];

    if (!validTypes.includes(type)) {
      return res.status(400).json({
        message: "Invalid vehicle type",
      });
    }

    // Step 4: Create vehicle
    const vehicle = await Vehicle.create({
      name,
      type,
      priceMultiplier: multiplier,
    });

    // Step 5: Send response
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


/*
|--------------------------------------------------------------------------
| GET VEHICLES (Public)
|--------------------------------------------------------------------------
| Returns active vehicles (latest first)
*/
const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ isActive: true })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: vehicles.length,
      vehicles,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


module.exports = { createVehicle, getVehicles };