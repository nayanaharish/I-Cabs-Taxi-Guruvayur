// Import required modules
const Package = require("../models/Package");
const mongoose = require("mongoose");

/*
|--------------------------------------------------------------------------
| CREATE PACKAGE (Admin Only)
|--------------------------------------------------------------------------
| Creates a new package with title, description and base price
*/
const createPackage = async (req, res) => {
  try {
    // Step 1: Extract data from request body
    const { title, description, basePrice } = req.body;

    // Step 2: Validate required fields
    // basePrice === undefined allows value 0
    if (!title || !description || basePrice === undefined) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Step 3: Convert basePrice to number (handles string input like "1000")
    const price = Number(basePrice);

    // Step 4: Validate number
    if (isNaN(price)) {
      return res.status(400).json({
        message: "Base price must be a valid number",
      });
    }

    // Step 5: Create package in DB
    const newPackage = await Package.create({
      title,
      description,
      basePrice: price,
    });

    // Step 6: Send success response
    return res.status(201).json({
      message: "Package created successfully",
      package: newPackage,
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
| GET PACKAGES (Public)
|--------------------------------------------------------------------------
| Supports:
| - Filtering (active/inactive)
| - Pagination (page, limit)
*/
const getPackages = async (req, res) => {
  try {
    // Step 1: Extract query params
    const { active, limit, page } = req.query;

    // Step 2: Build filter object
    const filter = {};

    if (active !== undefined) {
      // Convert string → boolean
      filter.isActive = active === "true";
    }

    // Step 3: Safe pagination (avoid negative or huge values)
    const pageNum = Math.max(Number(page) || 1, 1);
    const limitNum = Math.min(Math.max(Number(limit) || 5, 1), 50);

    // Step 4: Calculate skip value
    const skip = (pageNum - 1) * limitNum;

    // Step 5: Fetch total count (for frontend pagination)
    const total = await Package.countDocuments(filter);

    // Step 6: Fetch paginated data
    const packages = await Package.find(filter)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 }); // latest first

    // Step 7: Handle empty result
    if (packages.length === 0) {
      return res.status(200).json({
        message: "No packages found",
        packages: [],
      });
    }

    // Step 8: Send response
    return res.status(200).json({
      page: pageNum,
      limit: limitNum,
      total,                 // total documents
      count: packages.length, // current page count
      packages,
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
| GET PACKAGE BY ID
|--------------------------------------------------------------------------
| Fetch a single package using MongoDB ObjectId
*/
const getPackageById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid package ID",
      });
    }

    // Fetch package
    const foundPackage = await Package.findById(id);

    // Check existence
    if (!foundPackage) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    // Success response
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



/*
|--------------------------------------------------------------------------
| UPDATE PACKAGE (Admin Only)
|--------------------------------------------------------------------------
| Updates selected fields only
*/
const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid package ID",
      });
    }

    // Extract fields
    const { title, description, basePrice, isActive } = req.body;

    const updateData = {};

    // Only update provided fields
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;

    // Validate basePrice if provided
    if (basePrice !== undefined) {
      const price = Number(basePrice);

      if (isNaN(price)) {
        return res.status(400).json({
          message: "Base price must be a valid number",
        });
      }

      updateData.basePrice = price;
    }

    if (isActive !== undefined) updateData.isActive = isActive;

    // Update document
    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    // Check existence
    if (!updatedPackage) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    // Success response
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



/*
|--------------------------------------------------------------------------
| DELETE PACKAGE (Soft Delete)
|--------------------------------------------------------------------------
| Sets isActive = false instead of removing from DB
*/
const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid package ID",
      });
    }

    // Find package
    const pkg = await Package.findById(id);

    if (!pkg) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    if (!pkg.isActive) {
      return res.status(400).json({
        message: "Package is already inactive",
      });
    }

    // Soft delete
    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

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



/*
|--------------------------------------------------------------------------
| RESTORE PACKAGE
|--------------------------------------------------------------------------
| Re-activates a previously soft-deleted package
*/
const restorePackage = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid package ID",
      });
    }

    const pkg = await Package.findById(id);

    if (!pkg) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    if (pkg.isActive) {
      return res.status(400).json({
        message: "Package is already active",
      });
    }

    // Restore
    const restoredPackage = await Package.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Package restored successfully",
      package: restoredPackage,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


// Export all controllers
module.exports = {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  restorePackage,
};