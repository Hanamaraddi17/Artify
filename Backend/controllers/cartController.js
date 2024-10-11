const db = require('../config/db');

// Add to cart
exports.addToCart = (req, res) => {
    const { artwork_id, quantity } = req.body;
    const user_id = req.user_id;

    const query = "INSERT INTO Cart (user_id, artwork_id, quantity) VALUES (?, ?, ?)";
    db.query(query, [user_id, artwork_id, quantity], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error adding to cart." });
        }
        res.status(200).json({ message: "Artwork added to cart." });
    });
};

// Remove from cart
exports.removeFromCart = (req, res) => {
    const { artwork_id } = req.params;
    const user_id = req.user_id;

    const query = "DELETE FROM Cart WHERE user_id = ? AND artwork_id = ?";
    db.query(query, [user_id, artwork_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error removing from cart." });
        }
        res.status(200).json({ message: "Artwork removed from cart." });
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
