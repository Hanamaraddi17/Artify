const db = require("../config/db");

//================== Function to check if the user is an artist===========================
const isArtist = (userId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT artist_id FROM artists WHERE user_id = ?";
    db.query(query, [userId], (error, results) => {
      if (error) {
        return reject(
          new Error("Error checking artist status: " + error.message)
        );
      }
      if (results.length === 0) {
        return resolve(false); // User is not an artist
      }
      resolve(results[0].artist_id); // Return the artist ID if found
    });
  });
};

//====================================  Create a new artwork (only for artists)
exports.uploadArtwork = async (req, res) => {
  console.log("Received request to create artwork");

  const { title, description, price, category } = req.body;
  const userId = req.user.id; // Get user ID from the authenticated user
  const imageUrl = req.file ? req.file.path : null; // Image uploaded via Multer

  console.log("Title:", title);
  console.log("Description:", description);
  console.log("Price:", price);
  console.log("category :", category);
  console.log("User ID:", userId);
  console.log("Image URL:", imageUrl);

  // Validation: Check if all required fields are provided
  if (
    !title ||
    !description ||
    !price ||
    isNaN(price) ||
    price <= 0 ||
    !category
  ) {
    return res.status(400).json({
      error: "Title, description,category, and a valid price are required.",
    });
  }

  try {
    // Check if the user is an artist
    const artistId = await isArtist(userId);
    if (!artistId) {
      return res.status(403).json({
        error: "Only artists are allowed to create artworks.",
      });
    }

    // SQL query to insert the artwork into the database
    const query = `INSERT INTO artworks (title, description, price,category, image_url, artist_id) 
                   VALUES (?, ?, ?, ?, ?,?)`;

    // Execute the query
    db.query(
      query,
      [title, description, price, category, imageUrl, artistId],
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
  } catch (error) {
    console.error("Error during artwork creation:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// =============================== Fetch all artworks ===========================

// exports.fetchArtworks = (req, res) => {
  //   console.log("Received request to get all artworks");
  
  //   // SQL query to fetch all artworks along with the artist name
  //   const query = `
  //     SELECT artworks.*, artists.fullname AS artist_name
  //     FROM artworks
  //     JOIN artists ON artworks.artist_id = artists.artist_id
  //   `;
  
  //   db.query(query, (error, results) => {
    //     if (error) {
      //       console.error(
        //         "Error fetching artworks from the database:",
        //         error.message
        //       );
//       return res.status(500).json({ error: error.message });
//     }

//     console.log("Fetched artworks:", results);

//     res.json(results);
//   });
// };

// =============================== Fetch all artworks ===========================

exports.fetchArtworks = (req, res) => {
  const userId = req.user ? req.user.id : null; // Check if the user is authenticated, otherwise set userId to null

  console.log("Received request to get all artworks");

  // Base SQL query to fetch all artworks along with the artist name
  let query = `
    SELECT 
      artworks.*, 
      artists.fullname AS artist_name
  `;

  // If the user is authenticated, add the `isLiked` field
  if (userId) {
    query += `,
      CASE WHEN likes.user_id IS NOT NULL THEN 1 ELSE 0 END AS isLiked
    `;
  } else {
    // If not authenticated, set isLiked to 0 (false)
    query += `,
      0 AS isLiked
    `;
  }

  // Complete the query with the necessary joins
  query += `
    FROM artworks
    JOIN artists ON artworks.artist_id = artists.artist_id
  `;

  // Only join the likes table if the user is authenticated
  if (userId) {
    query += `
      LEFT JOIN likes ON artworks.artwork_id = likes.artwork_id AND likes.user_id = ?
    `;
  }

  // Execute the query with or without the user ID
  db.query(query, userId ? [userId] : [], (error, results) => {
    if (error) {
      console.error(
        "Error fetching artworks from the database:",
        error.message
      );
      return res.status(500).json({ error: error.message });
    }

    // Map the results to convert `isLiked` from 1/0 to true/false
    const artworksWithLikes = results.map((artwork) => ({
      ...artwork,
      isLiked: Boolean(artwork.isLiked), // Convert 1 to true and 0 to false
    }));

    console.log("Fetched artworks:", artworksWithLikes);
    res.json(artworksWithLikes);
  });
};

// ===========================  Fetch artwork by ID ============================

exports.fetchArtworkById = (req, res) => {
  const artworkId = req.params.id;
  console.log(`Received request to get artwork with ID: ${artworkId}`);

  const query = "SELECT * FROM artworks WHERE artwork_id = ?";

  db.query(query, [artworkId], (error, results) => {
    if (error) {
      console.error("Error fetching artwork:", error.message);
      return res.status(500).json({ error: error.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    console.log("Fetched artwork:", results[0]);
    res.json(results[0]);
  });
};

// ============================ Delete Artwork ============================

const deleteFromDb = async (artworkId) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM artworks WHERE artwork_id = ?";

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
    const query = "SELECT artist_id FROM artworks WHERE artwork_id = ?";

    db.query(query, [artworkId], (error, results) => {
      if (error) {
        return reject(
          new Error(`Error fetching artwork owner: ${error.message}`)
        );
      }

      if (results.length === 0) {
        return reject(new Error("Artwork not found"));
      }

      resolve(results[0].artist_id); // Return the artist ID of the artwork owner
    });
  });
};

// Function to get the artist ID of the logged-in user

const getUserArtistId = async (userId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT artist_id FROM artists WHERE user_id = ?";

    db.query(query, [userId], (error, results) => {
      if (error) {
        return reject(new Error(`Error fetching artist ID: ${error.message}`));
      }

      if (results.length === 0) {
        return reject(new Error("Artist profile not found"));
      }

      resolve(results[0].artist_id); // Return the artist ID of the logged-in user
    });
  });
};

exports.deleteArtwork = async (req, res) => {
  try {
    const artworkId = req.params.id; // Get artwork ID from the request params
    console.log("Artwork ID:", artworkId);

    if (!artworkId) {
      return res.status(400).json({ error: "Artwork ID is required" });
    }

    const userId = req.user.id;

    // Get the artist ID of the logged-in user
    const userArtistId = await getUserArtistId(userId);

    // Get the owner (artist) ID of the artwork
    const artworkOwnerId = await getArtworkOwner(artworkId);

    // Check if the logged-in artist is the owner of the artwork
    if (userArtistId !== artworkOwnerId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this artwork" });
    }

    // Delete the artwork from the database
    await deleteFromDb(artworkId);

    // If the artwork was deleted, inform the client
    res.status(200).json({ message: "Artwork deleted successfully" });
  } catch (error) {
    console.error("Error deleting artwork:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// ========================== Like an artwork ===============================

exports.toggleLikeArtwork = (req, res) => {
  const artworkId = req.params.id; // Get the artwork ID from the request parameters
  const userId = req.user.id; // Assuming user ID is available in req.user

  console.log(
    `Received request to toggle like for artwork ID: ${artworkId} by user ID: ${userId}`
  );

  // Check if the user has already liked the artwork
  const checkLikeQuery = `SELECT COUNT(*) AS liked FROM likes WHERE artwork_id = ? AND user_id = ?`;

  db.query(checkLikeQuery, [artworkId, userId], (error, results) => {
    if (error) {
      console.error("Error checking like status:", error.message);
      return res.status(500).json({ error: error.message });
    }

    if (results[0].liked > 0) {
      // User has already liked the artwork, so we unlike it
      const deleteLikeQuery = `DELETE FROM likes WHERE artwork_id = ? AND user_id = ?`;

      db.query(deleteLikeQuery, [artworkId, userId], (error) => {
        if (error) {
          console.error("Error removing like:", error.message);
          return res.status(500).json({ error: error.message });
        }

        // Decrement the likes count for the artwork
        const updateLikesQuery = `UPDATE artworks SET likes = likes - 1 WHERE artwork_id = ?`;

        db.query(updateLikesQuery, [artworkId], (error) => {
          if (error) {
            console.error("Error updating like count:", error.message);
            return res.status(500).json({ error: error.message });
          }

          console.log("Artwork unliked successfully:", artworkId);
          return res
            .status(200)
            .json({ message: "Artwork unliked successfully.", isLiked: false });
        });
      });
    } else {
      // User hasn't liked the artwork, so we add a like
      const insertLikeQuery = `INSERT INTO likes (user_id, artwork_id) VALUES (?, ?)`;

      db.query(insertLikeQuery, [userId, artworkId], (error) => {
        if (error) {
          console.error("Error adding like:", error.message);
          return res.status(500).json({ error: error.message });
        }

        // Increment the likes count for the artwork
        const updateLikesQuery = `UPDATE artworks SET likes = likes + 1 WHERE artwork_id = ?`;

        db.query(updateLikesQuery, [artworkId], (error) => {
          if (error) {
            console.error("Error updating like count:", error.message);
            return res.status(500).json({ error: error.message });
          }

          console.log("Artwork liked successfully:", artworkId);
          return res
            .status(200)
            .json({ message: "Artwork liked successfully.", isLiked: true });
        });
      });
    }
  });
};

// ========================== Get liked items for a specific user ==========================

exports.getLikedItems = (req, res) => {
  const userId = req.user.id; // Get user ID from the authenticated request
  console.log(`Fetching liked items for user ID: ${userId}`);

  // SQL query to fetch artworks liked by the user
  const query = `
    SELECT a.artwork_id, a.title, a.image_url, a.description, a.price, a.created_at
    FROM artworks a
    INNER JOIN likes l ON a.artwork_id = l.artwork_id
    WHERE l.user_id = ?
  `;

  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error("Error fetching liked items:", error.message);
      return res.status(500).json({ error: error.message });
    }

    console.log("Query Results:", results); // Add this line for debugging

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No liked items found for this user." });
    }

    console.log("Fetched liked items for user ID:", userId);
    res.json(results); // Return the list of liked items
  });
};
