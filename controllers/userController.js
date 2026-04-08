// Import User model to interact with users collection
const User = require("../models/User");

// Import bcrypt for password hashing and comparison
const bcrypt = require("bcrypt");

// Import jsonwebtoken to generate authentication tokens
const jwt = require("jsonwebtoken");


// ---------------------- REGISTER ----------------------

// Controller to handle user registration
const registerUser = async (req, res) => {
  try {
    // Step 1: Extract data from request body
    const { name, email, password } = req.body;

    // Step 2: Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Step 3: Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Step 4: Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 5: Create user in DB
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Step 6: Send response
    res.status(201).json({
      message: "User registered successfully",
      userId: newUser._id,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ---------------------- LOGIN ----------------------

// Controller to handle user login
const loginUser = async (req, res) => {
  try {
    // Step 1: Extract credentials
    const { email, password } = req.body;

    // Step 2: Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Step 3: Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Step 4: Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Step 5: Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,   // payload: unique identifier
        role: user.role // payload: role (used for authorization later)
      },
      process.env.JWT_SECRET, // secret key used to sign token
      {
        expiresIn: "1d" // token expiry (1 day)
      }
    );

    // Step 6: Send response with token
    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        name: user.name,
        email: user.email,
        role:user.role
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Export controllers
module.exports = { registerUser, loginUser };