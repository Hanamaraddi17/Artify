const db = require('../config/db');

// Add to cart
exports.addToCart = (req, res) => {
    const { artwork_id, quantity } = req.body;
    const user_id = req.user.id;

    // Check if the artwork is already in the cart
    const checkQuery = "SELECT * FROM Cart WHERE user_id = ? AND artwork_id = ?";
    db.query(checkQuery, [user_id, artwork_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error checking cart." });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: "Artwork already in cart." });
        }

        // If artwork is not in the cart, add it
        const addQuery = "INSERT INTO Cart (user_id, artwork_id, quantity) VALUES (?, ?, ?)";
        db.query(addQuery, [user_id, artwork_id, quantity], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error adding to cart." });
            }
            res.status(200).json({ message: "Artwork added to cart." });
        });
    });
};

// Remove from cart
exports.removeFromCart = (req, res) => {
    const { artwork_id } = req.params;
    const user_id = req.user_id;

    // Check if the artwork exists in the cart
    const checkQuery = "SELECT * FROM Cart WHERE user_id = ? AND artwork_id = ?";
    db.query(checkQuery, [user_id, artwork_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error checking cart." });
        }

        if (results.length === 0) {
            return res.status(400).json({ error: "Artwork not found in cart." });
        }

        // If the artwork exists, remove it
        const deleteQuery = "DELETE FROM Cart WHERE user_id = ? AND artwork_id = ?";
        db.query(deleteQuery, [user_id, artwork_id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error removing from cart." });
            }
            res.status(200).json({ message: "Artwork removed from cart." });
        });
    });
};

// Fetch cart items
exports.fetchCartItems = (req, res) => {
    const user_id = req.user_id;

    const query = "SELECT * FROM Cart WHERE user_id = ?";
    db.query(query, [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching cart items." });
        }
        res.status(200).json(results);
    });
}; 
