const db = require('../config/db');

exports.createOrder = (req, res) => {
    const { artworkId } = req.body;
    const userId = req.user.id; // From auth middleware

    const query = 'INSERT INTO orders (userId, artworkId) VALUES (?, ?)';
    db.query(query, [userId, artworkId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ message: 'Order created', orderId: results.insertId });
    });
};

exports.getUserOrders = (req, res) => {
    const userId = req.user.id;

    const query = 'SELECT * FROM orders WHERE userId = ?';
    db.query(query, [userId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
};
