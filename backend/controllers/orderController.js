const db = require('../config/db');

// Helper function to fetch artwork price from the database
const getArtworkPrice = async (artworkId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT price FROM artworks WHERE id = ?';
        
        db.query(query, [artworkId], (error, results) => {
            if (error) {
                return reject(new Error(`Error fetching artwork price: ${error.message}`));
            }
            
            if (results.length === 0) {
                return reject(new Error('Artwork not found'));
            }
            
            resolve(results[0].price); // Return the price of the artwork
        });
    });
};

// Controller function to create an order
exports.createOrder = async (req, res) => {
    try {
        // Check if artworkId is provided
        const { artworkId } = req.body;
        if (!artworkId) {
            return res.status(400).json({ error: 'Artwork ID is required' });
        }

        const userId = req.user.id; // Retrieved from auth middleware

        // Get the artwork price using the helper function
        const totalPrice = await getArtworkPrice(artworkId);
        console.log('Artwork ID:', artworkId);  // Debugging log
        console.log('Total Price:', totalPrice);  // Debugging log

        // Insert the order into the database
        const query = 'INSERT INTO orders (buyer_id, artwork_id, total_price) VALUES (?, ?, ?)';
        
        db.query(query, [userId, artworkId, totalPrice], (error, results) => {
            if (error) {
                return res.status(500).json({ error: `Error creating order: ${error.message}` });
            }
            
            // Respond with success and return the order ID
            res.status(201).json({ message: 'Order created successfully', orderId: results.insertId });
        });

    } catch (error) {
        // Handle any errors that occurred during the process
        console.error('Error processing order:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Controller function to fetch all orders for the authenticated user
exports.getUserOrders = (req, res) => {
    const userId = req.user.id; // Retrieved from auth middleware

    const query = 'SELECT * FROM orders WHERE buyer_id = ?';
    
    db.query(query, [userId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: `Error fetching orders: ${error.message}` });
        }

        // Respond with the user's orders
        res.status(200).json(results);
    });
};
