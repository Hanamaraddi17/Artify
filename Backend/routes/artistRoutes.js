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
router.get("/:id", artistController.getArtistById);

// Route to fetch all artists
router.get("/", artistController.getAllArtists);

// Route to update artist profile
// router.put('/:id', authMiddleware, artistController.updateArtist);

// Route to delete an artist account
router.delete("/:id", authMiddleware, artistController.deleteArtist);

module.exports = router;
