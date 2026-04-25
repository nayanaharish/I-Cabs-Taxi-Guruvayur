// Import express to create router
const express = require('express');

// Create router instance
const router = express.Router();

// Import controller (destructure correctly)
const { createPackage ,getPackages ,getPackageById ,updatePackage ,deletePackage} = require('../controllers/packageController');

// Import middleware
const verifyToken = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/roleMiddleware');

// Define route to create package
// POST /api/packages
// Flow: auth → role → controller
router.post('/', verifyToken, verifyAdmin, createPackage);

//GET /api/packages
router.get('/',getPackages)

//get single package by id
router.get('/:id',getPackageById)

//update package
router.put('/:id',verifyToken,verifyAdmin,updatePackage)

//delete(soft delete) package

router.delete('/:id',deletePackage)

// Export router
module.exports = router;