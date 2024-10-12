const jwt = require("jsonwebtoken");

// Middleware to authenticate users
const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers["authorization"]?.split(" ")[1];

  // Check if token is present
  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token using JWT secret
    req.user = decoded; // Attach decoded user information to request object

    console.log(`Decoded user: ${JSON.stringify(decoded)}`); // Logging for debugging
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  // Proceed to the next middleware or route handler
  next();
};

module.exports = authMiddleware;
