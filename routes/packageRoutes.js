// Import express to create router
const express = require('express');

// Create router instance
const router = express.Router();

// Import controller (destructure correctly)
const { createPackage } = require('../controllers/packageController');

// Import middleware
const verifyToken = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/roleMiddleware');

// Define route to create package
// POST /api/packages
// Flow: auth → role → controller
router.post('/', verifyToken, verifyAdmin, createPackage);

// Export router
module.exports = router;