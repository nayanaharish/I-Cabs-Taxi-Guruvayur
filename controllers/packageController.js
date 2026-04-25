const Package = require("../models/Package");
const {mongoose} = require('mongoose');

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



// Controller to get package by ID
const getPackageById = async (req, res) => {
  try {
    // Step 1: Get ID from params
    const { id } = req.params;

    // Step 2: Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid package ID",
      });
    }

    // Step 3: Fetch package
    const foundPackage = await Package.findById(id);

    // Step 4: Check if not found
    if (!foundPackage) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    // Step 5: Return success response
    return res.status(200).json({
      message: "Package fetched successfully",
      package: foundPackage,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Controller to update package (Admin only)
const updatePackage = async (req, res) => {
  try {
    // Step 1: Get ID from route params
    const { id } = req.params;

    // Step 2: Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid package ID",
      });
    }

    // Step 3: Extract fields from request body
    // Only allow specific fields to be updated
    const { title, description, basePrice, isActive } = req.body;

    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (basePrice !== undefined) updateData.basePrice = basePrice;
    if (isActive !== undefined) updateData.isActive = isActive;

    // Step 4: Update package
    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,          // return updated document
        runValidators: true // apply schema validation
      }
    );

    // Step 5: Check if package exists
    if (!updatedPackage) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    // Step 6: Return success response
    return res.status(200).json({
      message: "Package updated successfully",
      package: updatedPackage,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};



// Controller to soft delete package (Admin only)
const deletePackage = async (req, res) => {
  try {
    // Step 1: Get ID from params
    const { id } = req.params;

    // Step 2: Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid package ID",
      });
    }

    // Step 3: Find package
    const packageToDelete = await Package.findById(id);

    // Step 4: Check if package exists
    if (!packageToDelete) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    // Step 5: Check if already inactive
    if (!packageToDelete.isActive) {
      return res.status(400).json({
        message: "Package is already inactive",
      });
    }

    // Step 6: Soft delete (set isActive = false)
    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    // Step 7: Return response
    return res.status(200).json({
      message: "Package deleted successfully",
      package: updatedPackage,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = { createPackage ,getPackages,getPackageById,updatePackage,deletePackage};