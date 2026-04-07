// Import mongoose library to define schema and interact with MongoDB
const mongoose = require("mongoose");

// Define user schema (structure of user data)
const userSchema = new mongoose.Schema(
  {
    // User's name
    name: {
      type: String,
      required: true, // must be provided
    },

    // User's email (must be unique)
    email: {
      type: String,
      required: true,
      unique: true, // no duplicate emails
    },

    // User's password (will be hashed later)
    password: {
      type: String,
      required: true,
    },

    // Role of user (default is "user", can be "admin")
    role: {
      type: String,
      default: "user",
    },
  },
  {
    // Automatically adds:
    // createdAt → when document is created
    // updatedAt → when document is updated
    timestamps: true,
  }
);

// Create a Mongoose model named "User" based on userSchema
// This model is used to interact with the "users" collection in MongoDB
// Exporting it so it can be used in controllers and routes
module.exports = mongoose.model("User", userSchema);