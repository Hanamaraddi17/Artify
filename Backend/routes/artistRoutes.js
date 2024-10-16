const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artistController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../config/multer/pfpUpload"); // Import the multer configuration

// Route to create an artist profile (for users joining as artists)
router.post(
  "/join",
  authMiddleware,
  upload.single("photo"),
  artistController.joinArtist
);

// Route to fetch the artist's information by artist ID
router.get("/myartworks", authMiddleware, artistController.fetchMyArtWorks);
router.get("/:id", artistController.getArtistById);

// Route to fetch all artists
router.get("/", artistController.getAllArtists);

// New route to check if the current user is an artist
router.get("/check/artist", authMiddleware, artistController.checkIfArtist); // New route to check if user is artist

module.exports = router;
