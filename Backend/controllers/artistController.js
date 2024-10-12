const db = require("../config/db");

// ========================== Create a new artist ==========================

exports.joinArtist = (req, res) => {
  console.log("Received request to create artist");

  const { fullname, age, biography, address, phone,  email } = req.body;
  const photo = req.file ? req.file.path : null; // From Multer
  const user_id = req.user.id; // From auth middleware

  console.log(`In artist Controller for user ID: ${req.user.id}`);

  // SQL query to insert the artist into the database
  const query = `INSERT INTO artists (fullname, age, biography, photo, address, phone, email, user_id) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  // Execute the query
  db.query(query, [fullname, age, biography, photo, address, phone, email, user_id], (error, results) => {
    if (error) {
      console.error("Error inserting artist into the database:", error.message);
      return res.status(500).json({ error: error.message });
    }
    console.log("Artist created with ID:", results.insertId);
    res.status(201).json({ message: "Artist created", artistId: results.insertId });
  });
};

// ========================== Fetch all artists with total artworks ==========================

exports.getAllArtists = (req, res) => {
  console.log("Received request to get all artists");

  // SQL query to fetch all artists along with the total number of artworks for each artist
  const query = `
    SELECT a.*, COUNT(artworks.artwork_id) AS total_artworks
    FROM artists a
    LEFT JOIN artworks ON a.artist_id = artworks.artist_id
    GROUP BY a.artist_id
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching artists from the database:", error.message);
      return res.status(500).json({ error: error.message });
    }
    console.log("Fetched artists with total artworks:", results);
    res.json(results);
  });
};

// ========================== Fetch an artist by ID with total artworks ==========================

exports.getArtistById = (req, res) => {
  const artistId = req.params.id;
  console.log(`Received request to get artist with ID: ${artistId}`);

  // SQL query to fetch the artist and the total number of artworks they have created
  const query = `
    SELECT a.*, COUNT(artworks.artwork_id) AS total_artworks
    FROM artists a
    LEFT JOIN artworks ON a.artist_id = artworks.artist_id
    WHERE a.artist_id = ?
    GROUP BY a.artist_id
  `;

  db.query(query, [artistId], (error, results) => {
    if (error) {
      console.error("Error fetching artist:", error.message);
      return res.status(500).json({ error: error.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Artist not found" });
    }

    console.log("Fetched artist with total artworks:", results[0]);
    res.json(results[0]);
  });
};

// ========================== Delete an artist ==========================

const deleteArtistFromDb = async (artistId) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM artists WHERE artist_id = ?";

    db.query(query, [artistId], (error, results) => {
      if (error) {
        return reject(new Error(`Error deleting artist: ${error.message}`));
      }

      if (results.affectedRows === 0) {
        return reject(new Error("Artist not found or already deleted"));
      }

      resolve("Deleted");
    });
  });
};

const getArtistOwner = async (artistId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT user_id FROM artists WHERE artist_id = ?";

    db.query(query, [artistId], (error, results) => {
      if (error) {
        return reject(
          new Error(`Error fetching artist owner: ${error.message}`)
        );
      }

      if (results.length === 0) {
        return reject(new Error("Artist not found"));
      }

      resolve(results[0].user_id);
    });
  });
};

exports.deleteArtist = async (req, res) => {
  try {
    const artistId = req.params.id;
    console.log("Artist ID:", artistId);

    if (!artistId) {
      return res.status(400).json({ error: "Artist ID is required" });
    }

    const userId = req.user.id;

    // Check if the artist exists and get the owner's ID
    const ownerId = await getArtistOwner(artistId);

    // Check if the user is the owner of the artist profile
    if (userId !== ownerId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this artist" });
    }

    // Delete the artist from the database
    await deleteArtistFromDb(artistId);

    // If the artist was deleted, inform users about the deletion
    res.status(200).json({ message: "Artist deleted successfully" });
  } catch (error) {
    console.error("Error deleting artist:", error.message);
    res.status(500).json({ error: error.message });
  }
};
