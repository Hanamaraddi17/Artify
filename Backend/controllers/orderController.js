const db = require('../config/db');

// Place order
exports.placeOrder = (req, res) => {
    const { total_price, delivery_address, payment_status, items } = req.body;
    const user_id = req.user_id;

    const query = "INSERT INTO Orders (total_price, delivery_address, payment_status, user_id) VALUES (?, ?, ?, ?)";
    db.query(query, [total_price, delivery_address, payment_status, user_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error placing order." });
        }
        
        const order_id = result.insertId;
        const orderItemsQuery = "INSERT INTO Order_Items (order_id, artwork_id, quantity, total_price) VALUES ?";

        const orderItemsData = items.map(item => [order_id, item.artwork_id, item.quantity, item.total_price]);
        db.query(orderItemsQuery, [orderItemsData], (err) => {
            if (err) {
                return res.status(500).json({ error: "Error placing order items." });
            }
            res.status(200).json({ message: "Order placed successfully!" });
        });
    });
};

// Fetch orders
exports.fetchOrders = (req, res) => {
    const user_id = req.user_id;

    const query = "SELECT * FROM Orders WHERE user_id = ?";
    db.query(query, [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching orders." });
        }
        res.status(200).json(results);
    });
};
