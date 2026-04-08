// Import express to create router
const express = require('express');

// Create a router instance to define routes
const router = express.Router();

// Import controller function (will handle business logic)
const { registerUser ,loginUser ,testUser} = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/roleMiddleware');



// Define POST route for user registration
// When client sends request to /api/users/register,
// registerUser controller will handle it
router.post('/register', registerUser);

//define POST route for user login
//when client sends request to /api/users/login ,
//loginUser controller will handle it

router.post('/login',loginUser);

router.post('/test',verifyToken,verifyAdmin,testUser)



// Export router to use in main server file
module.exports = router;