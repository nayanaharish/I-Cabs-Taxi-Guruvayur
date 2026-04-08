// Import JWT to verify token
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {

  // Step 1: Get Authorization header
  const authHeader = req.headers.authorization;

  // Step 2: Check if header exists
  if (!authHeader) {
    return res.status(401).json({
      message: "Not authorized. Token missing."
    });
  }

  // Step 3: Check format "Bearer <token>"
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Invalid token format."
    });
  }

  // Step 4: Extract token (remove "Bearer ")
  const token = authHeader.split(" ")[1];

  try {
    // Step 5: Verify token using secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    
    // Step 6: Attach decoded user data to request
    req.user = decoded;

    // Step 7: Move to next middleware/controller
    next();

  } catch (error) {
    // Step 8: Handle invalid or expired token
    return res.status(401).json({
      message: "Invalid or expired token."
    });
  }
};

// Export middleware
module.exports = verifyToken;