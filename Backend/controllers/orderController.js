const db = require('../config/db');

// Place order
exports.placeOrder = (req, res) => {
    const { delivery_address, payment_status } = req.body;
    const user_id = req.user_id;

    // Step 1: Fetch items from the cart for the logged-in user
    const cartQuery = `
        SELECT Cart.artwork_id, Cart.quantity, Artwork.price 
        FROM Cart 
        JOIN Artwork ON Cart.artwork_id = Artwork.artwork_id 
        WHERE Cart.user_id = ?
    `;

    db.query(cartQuery, [user_id], (err, cartItems) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching cart items." });
        }

        if (cartItems.length === 0) {
            return res.status(400).json({ error: "Your cart is empty. Cannot place order." });
        }

        // Step 2: Calculate total price
        const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        // Step 3: Insert the order into the Orders table
        const orderQuery = "INSERT INTO Orders (total_price, delivery_address, payment_status, user_id) VALUES (?, ?, ?, ?)";
        db.query(orderQuery, [totalPrice, delivery_address, payment_status, user_id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error placing order." });
            }

            const order_id = result.insertId;

            // Step 4: Insert the items into the Order_Items table
            const orderItemsQuery = "INSERT INTO Order_Items (order_id, artwork_id, quantity, total_price) VALUES ?";
            const orderItemsData = cartItems.map(item => [order_id, item.artwork_id, item.quantity, item.price * item.quantity]);

            db.query(orderItemsQuery, [orderItemsData], (err) => {
                if (err) {
                    return res.status(500).json({ error: "Error placing order items." });
                }

                // Step 5: Clear the cart for the user after placing the order
                const clearCartQuery = "DELETE FROM Cart WHERE user_id = ?";
                db.query(clearCartQuery, [user_id], (err) => {
                    if (err) {
                        return res.status(500).json({ error: "Error clearing cart after order." });
                    }

                    res.status(200).json({ message: "Order placed successfully!", order_id });
                });
            });
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
