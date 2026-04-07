// Import express to create router
const express = require('express');

// Create a router instance to define routes
const router = express.Router();

// Import controller function (will handle business logic)
const { registerUser } = require('../controllers/userController');

// Define POST route for user registration
// When client sends request to /api/users/register,
// registerUser controller will handle it
router.post('/register', registerUser);

// Export router to use in main server file
module.exports = router;