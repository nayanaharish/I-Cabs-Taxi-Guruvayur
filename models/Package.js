// Import mongoose to define schema and interact with MongoDB
const mongoose = require("mongoose");

// Define schema for Package collection
// Schema = structure + rules for how data is stored in MongoDB
const packageSchema = new mongoose.Schema(
  {
    // Title of the package (e.g., "Guruvayoor Temple Visit")
    // Required field → cannot create package without title
    title: {
      type: String,
      required: true,
    },

    // Description of the package
    // Helps explain what the package includes
    description: {
      type: String,
      required: true,
    },

    // Base price of the package
    // This will later be modified using vehicle multiplier
    basePrice: {
      type: Number,
      required: true,

      // Validation → price cannot be negative
      min: 0,
    },

    // Flag to enable/disable package
    // Useful instead of deleting (soft delete concept)
    isActive: {
      type: Boolean,
      default: true,
    }
  },

  // Schema options (NOT fields)
  {
    // Automatically adds:
    // createdAt → when document is created
    // updatedAt → when document is updated
    timestamps: true,
  }
);

// Create model from schema
// "Package" → collection name becomes "packages" in MongoDB
// Model is used to perform DB operations (create, read, update, delete)
module.exports = mongoose.model("Package", packageSchema);