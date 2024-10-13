const db = require('../config/db');

// Place order
exports.placeOrder = (req, res) => {
    const { delivery_address, payment_status } = req.body;
    const user_id = req.user.id; // Ensure this is correctly set
    console.log(req.user.id);

    // Step 1: Fetch items from the cart for the logged-in user
    const cartQuery = `
        SELECT Cart.artwork_id, Cart.quantity, Artworks.price 
        FROM Cart 
        JOIN Artworks ON Cart.artwork_id = Artworks.artwork_id 
        WHERE Cart.user_id = ?
    `;

    db.query(cartQuery, [user_id], (err, cartItems) => {
        if (err) {
            console.error("Error fetching cart items:", err); // Log the error
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
                console.error("Error placing order:", err); // Log the error
                return res.status(500).json({ error: "Error placing order." });
            }

            const order_id = result.insertId;

            // Step 4: Insert the items into the Order_Items table
            const orderItemsQuery = "INSERT INTO Order_Items (order_id, artwork_id, quantity, total_price) VALUES ?";
            const orderItemsData = cartItems.map(item => [order_id, item.artwork_id, item.quantity, item.price * item.quantity]);

            db.query(orderItemsQuery, [orderItemsData], (err) => {
                if (err) {
                    console.error("Error placing order items:", err); // Log the error
                    return res.status(500).json({ error: "Error placing order items." });
                }

                // Step 5: Clear the cart for the user after placing the order
                const clearCartQuery = "DELETE FROM Cart WHERE user_id = ?";
                db.query(clearCartQuery, [user_id], (err) => {
                    if (err) {
                        console.error("Error clearing cart after order:", err); // Log the error
                        return res.status(500).json({ error: "Error clearing cart after order." });
                    }

                    res.status(200).json({ message: "Order placed successfully!", order_id });
                });
            });
        });
    });
};

// Fetch orders with artwork details
exports.fetchOrders = (req, res) => {
    const user_id = req.user.id; // Ensure you are using req.user.id

    const query = `
        SELECT o.order_id, o.total_price, o.delivery_address, o.payment_status, o.order_date,
               oi.artwork_id, oi.quantity, oi.total_price AS item_total_price, a.title, a.image_url
        FROM Orders o
        JOIN Order_Items oi ON o.order_id = oi.order_id
        JOIN Artworks a ON oi.artwork_id = a.artwork_id
        WHERE o.user_id = ?
    `;
    
    db.query(query, [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching orders." });
        }
        
        // Group orders by order_id
        const orders = {};
        results.forEach(item => {
            if (!orders[item.order_id]) {
                orders[item.order_id] = {
                    order_id: item.order_id,
                    total_price: item.total_price,
                    delivery_address: item.delivery_address,
                    payment_status: item.payment_status,
                    order_date: item.order_date,
                    items: []
                };
            }
            orders[item.order_id].items.push({
                artwork_id: item.artwork_id,
                quantity: item.quantity,
                item_total_price: item.item_total_price,
                title: item.title,
                image_url: item.image_url
            });
        });

        res.status(200).json(Object.values(orders));
    });
};
