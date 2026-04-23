const Package = require("../models/Package");

// Controller for creating package (Admin only)
const createPackage = async (req, res) => {
  try {
    // Step 1: Extract data
    const { title, description, basePrice } = req.body;

    // Step 2: Validate fields
    // basePrice === undefined is important (0 should be allowed)
    if (!title || !description || basePrice === undefined) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Step 3: Validate basePrice type
    if (typeof basePrice !== "number") {
      return res.status(400).json({
        message: "Base price must be a number",
      });
    }

    // Step 4: Create package
    const newPackage = await Package.create({
      title,
      description,
      basePrice,
    });

    // Step 5: Send response
    return res.status(201).json({
      message: "Package created successfully",
      package: newPackage,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};



// Controller to get all active packages (public)
const getPackages = async (req, res) => {
  try {
    // Step 1: Fetch active packages from DB
    const packages = await Package.find({ isActive: true });

    // Step 2: Send response (even if empty array)
    return res.status(200).json({
      message: "Packages fetched successfully",
      packages: packages,
    });

  } catch (error) {
    console.error(error);

    // Step 3: Handle server error
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


module.exports = { createPackage ,getPackages};