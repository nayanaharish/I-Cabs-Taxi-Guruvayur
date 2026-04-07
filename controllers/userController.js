// Import User model to interact with users collection
const User = require("../models/User");

// Import bcrypt for password hashing
const bcrypt = require("bcrypt");

// Controller function to handle user registration
const registerUser = async (req, res) => {
  try {
    // Step 1: Extract data from request body
    const { name, email, password } = req.body;

    // Step 2: Validate input (check if any field is missing)
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Step 3: Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Step 4: Hash the password
    // bcrypt.hash takes password + salt rounds (e.g., 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 5: Create new user with hashed password
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Step 6: Send success response
    res.status(201).json({
      message: "User registered successfully",
      userId: newUser._id,
    });

  } catch (error) {
    // Step 7: Handle server errors
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Export controller to use in routes
module.exports = { registerUser };