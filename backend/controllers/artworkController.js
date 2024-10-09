const db = require("../config/db");

exports.createArtwork = (req, res) => {
  console.log("Received request to create artwork");

  // Destructure data from the request body
  const { title, description, price } = req.body;
  const artistId = req.user.id; // From auth middleware, renamed for clarity
  const imageUrl = req.file ? req.file.path : null; // From Multer

  //console.log("Title:", title);
  // console.log('Description:', description);
  // console.log('Price:', price);
  // console.log('Artist ID:', artistId);
  // console.log('Image URL:', imageUrl);

  // SQL query to insert the artwork into the database
  const query =
    "INSERT INTO artworks (title, description, price, image_url, artist_id) VALUES (?, ?, ?, ?, ?)";

  // Execute the query
  db.query(
    query,
    [title, description, price, imageUrl, artistId],
    (error, results) => {
      if (error) {
        console.error(
          "Error inserting artwork into the database:",
          error.message
        );
        return res.status(500).json({ error: error.message });
      }
      console.log("Artwork created with ID:", results.insertId);
      res
        .status(201)
        .json({ message: "Artwork created", artworkId: results.insertId });
    }
  );
};

exports.getAllArtworks = (req, res) => {
  console.log("Received request to get all artworks");

  // SQL query to fetch all artworks from the database
  const query = "SELECT * FROM artworks";

  db.query(query, (error, results) => {
    if (error) {
      console.error(
        "Error fetching artworks from the database:",
        error.message
      );
      return res.status(500).json({ error: error.message });
    }
    console.log("Fetched artworks:", results);
    res.json(results);
  });
};

// ============================delete Artwork from database====================================
const deleteFromDb = async (artworkId) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM artworks WHERE id = ?";

    db.query(query, [artworkId], (error, results) => {
      if (error) {
        return reject(new Error(`Error deleting artwork: ${error.message}`));
      }

      if (results.affectedRows === 0) {
        return reject(new Error("Artwork not found or already deleted"));
      }

      resolve("Deleted");
    });
  });
};

const getArtworkOwner = async (artworkId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT artist_id FROM artworks WHERE id = ?";

    db.query(query, [artworkId], (error, results) => {
      if (error) {
        return reject(
          new Error(`Error fetching artwork owner: ${error.message}`)
        );
      }

      if (results.length === 0) {
        return reject(new Error("Artwork not found"));
      }

      resolve(results[0].artist_id);
    });
  });
};

exports.deleteArtwork = async (req, res) => {
  try {
    const artworkId = req.params.id; // Use params to get artwork ID from the route
    console.log("Artwork ID:", artworkId);
    console.log("User Info:", req.user); // Debugging line

    if (!artworkId) {
      return res.status(400).json({ error: "Artwork ID is required" });
    }

    const userId = req.user.id;

    // Check if the artwork exists and get the owner's ID
    const ownerId = await getArtworkOwner(artworkId);

    // Check if the user is the owner of the artwork
    if (userId !== ownerId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this artwork" });
    }

    // Delete the artwork from the database
    await deleteFromDb(artworkId);

    // If the artwork was deleted, inform users about the deletion
    res.status(200).json({ message: "Artwork deleted successfully" });
  } catch (error) {
    console.error("Error deleting artwork, try again:", error.message);
    res.status(500).json({ error: error.message });
  }
};
