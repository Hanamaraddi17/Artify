const db = require('../config/db');

exports.createArtwork = (req, res) => {
    console.log('Received request to create artwork');

    // Destructure data from the request body
    const { title, description, price } = req.body;
    const artistId = req.user.id; // From auth middleware, renamed for clarity
    const imageUrl = req.file ? req.file.path : null; // From Multer

    // console.log('Title:', title);
    // console.log('Description:', description);
    // console.log('Price:', price);
    // console.log('Artist ID:', artistId);
    // console.log('Image URL:', imageUrl);

    // SQL query to insert the artwork into the database
    const query = 'INSERT INTO artworks (title, description, price, image_url, artist_id) VALUES (?, ?, ?, ?, ?)';

    // Execute the query
    db.query(query, [title, description, price, imageUrl, artistId], (error, results) => {
        if (error) {
            console.error('Error inserting artwork into the database:', error.message);
            return res.status(500).json({ error: error.message });
        }
        console.log('Artwork created with ID:', results.insertId);
        res.status(201).json({ message: 'Artwork created', artworkId: results.insertId });
    });
};

exports.getAllArtworks = (req, res) => {
    console.log('Received request to get all artworks');

    // SQL query to fetch all artworks from the database
    const query = 'SELECT * FROM artworks';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching artworks from the database:', error.message);
            return res.status(500).json({ error: error.message });
        }
        console.log('Fetched artworks:', results);
        res.json(results);
    });
};
