const jwt = require("jsonwebtoken");

// Middleware to authenticate users
const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers["authorization"]?.split(" ")[1];

  // Check if token is present
  if (!token) {
    return res.status(403).json({ message: "A token is required for authentication" });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have your JWT_SECRET in your .env file
    req.user = decoded; // Attach user information to the request object
    console.log(`user details after decoding ${req.user.user_id}`);
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  // Proceed to the next middleware or route handler
  next();
};

module.exports = authMiddleware;
