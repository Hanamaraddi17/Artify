const db = require("../config/db");

// ========================== Create a new artist ==========================

exports.joinArtist = (req, res) => {
  console.log("Received request to create artist");

  const { fullname, age, biography, address, phone, email } = req.body;
  const photo = req.file ? req.file.path : null; // From Multer
  const user_id = req.user.id; // From auth middleware

  console.log(`In artist Controller for user ID: ${req.user.id}`);

  // SQL query to insert the artist into the database
  const query = `INSERT INTO artists (fullname, age, biography, photo, address, phone, email, user_id) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  // Execute the query
  db.query(
    query,
    [fullname, age, biography, photo, address, phone, email, user_id],
    (error, results) => {
      if (error) {
        console.error(
          "Error inserting artist into the database:",
          error.message
        );
        return res.status(500).json({ error: error.message });
      }
      console.log("Artist created with ID:", results.insertId);
      res
        .status(201)
        .json({ message: "Artist created", artistId: results.insertId });
    }
  );
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

// ========================== Fetch an artist by ID with total artworks and all artworks ==========================

exports.getArtistById = (req, res) => {
  const artistId = req.params.id;

  // First query to fetch artist's basic information and the total number of artworks
  const artistQuery = `
    SELECT a.*, COUNT(artworks.artwork_id) AS total_artworks
    FROM artists a
    LEFT JOIN artworks ON a.artist_id = artworks.artist_id
    WHERE a.artist_id = ?
    GROUP BY a.artist_id
  `;

  // Query to fetch the last 3 uploaded artworks of the artist
  const artworksQuery = `
    SELECT * FROM artworks
    WHERE artist_id = ?
    ORDER BY created_at DESC
    LIMIT 3
`;

  db.query(artistQuery, [artistId], (error, artistResults) => {
    if (error) {
      console.error("Error fetching artist:", error.message);
      return res.status(500).json({ error: error.message });
    }

    if (artistResults.length === 0) {
      return res.status(404).json({ message: "Artist not found" });
    }

    const artistData = artistResults[0]; // Artist data with total artworks

    // Fetch all artworks of the artist
    db.query(artworksQuery, [artistId], (error, artworksResults) => {
      if (error) {
        console.error("Error fetching artworks:", error.message);
        return res.status(500).json({ error: error.message });
      }

      artistData.artworks = artworksResults; // Attach artworks to artist data
      res.json(artistData); // Return artist data with artworks
    });
  });
};

// ========================== Check if the current user is an artist ==========================

exports.checkIfArtist = (req, res) => {
  const userId = req.user.id; // User ID is taken from the authenticated user (via JWT or session)

  console.log(
    `Received request to check if user with ID: ${userId} is an artist`
  );

  // SQL query to check if the user has an artist profile
  const query = "SELECT artist_id FROM artists WHERE user_id = ?";

  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error("Error checking if user is an artist:", error.message);
      return res.status(500).json({ error: error.message });
    }

    if (results.length === 0) {
      // If no artist profile is found for this user
      console.log(`User with ID ${userId} is not an artist`);
      return res.json({ isArtist: false, message: "User is not an artist" });
    }

    // If the user has an artist profile
    console.log(`User with ID ${userId} is an artist`);
    res.json({ isArtist: true, artistId: results[0].artist_id });
  });
};


//============================================== Get artist by ID along with all artworks=================


exports.fetchMyArtWorks = (req, res) => {
  const userId = req.user.id; // Ensure user is set from authMiddleware

  // Check if the current user is an artist
  const query = "SELECT artist_id FROM artists WHERE user_id = ?";
  db.query(query, [userId], (error, results) => {
      if (error) {
          console.error("Error checking if user is an artist:", error.message);
          return res.status(500).json({ error: error.message });
      }

      if (results.length === 0) {
          return res.status(403).json({ isArtist: false, message: "User is not an artist" });
      }

      const artistId = results[0].artist_id; // Set artistId

      console.log("Received request to fetch artworks for artist with ID:", artistId); // Log artistId

      // SQL query to fetch artist's basic information and total number of artworks
      const artistQuery = `
          SELECT a.*, COUNT(artworks.artwork_id) AS total_artworks
          FROM artists a
          LEFT JOIN artworks ON a.artist_id = artworks.artist_id
          WHERE a.artist_id = ?
          GROUP BY a.artist_id
      `;

      // Query to fetch all artworks of the artist
      const artworksQuery = `
          SELECT * FROM artworks
          WHERE artist_id = ?
          ORDER BY created_at DESC
      `;

      // Fetch the artist's data
      db.query(artistQuery, [artistId], (error, artistResults) => {
          if (error) {
              console.error("Error fetching artist:", error.message); // Log error message
              return res.status(500).json({ error: error.message });
          }

          console.log("Artist query results:", artistResults); // Log artist query results

          if (artistResults.length === 0) {
              console.log("No artist found with ID:", artistId); // Log if no artist found
              return res.status(404).json({ message: "Artist not found" });
          }

          const artistData = artistResults[0]; // Artist data with total artworks
          console.log("Fetched artist data:", artistData); // Log fetched artist data

          // Fetch all artworks of the artist
          db.query(artworksQuery, [artistId], (error, artworksResults) => {
              if (error) {
                  console.error("Error fetching artworks:", error.message); // Log error message
                  return res.status(500).json({ error: error.message });
              }

              console.log("Fetched artworks:", artworksResults); // Log fetched artworks

              artistData.artworks = artworksResults; // Attach all artworks to artist data
              console.log("Final artist data with artworks:", artistData); // Log final response data
              res.json(artistData); // Return the artist data with all artworks
          });
      });
  });
};

