const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'A token is required for authentication' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user information to the request object
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
    
    next(); // Proceed to the next middleware/route handler
};

module.exports = authMiddleware;
