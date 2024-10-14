const express = require("express");
const artworkController = require("../controllers/artworkController"); // Ensure this path is correct
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware.js");
const upload = require("../config/multer/artworkUpload"); // Import the multer configuration

// Use the correct method from the controller

router.post(
  "/upload",
  authMiddleware,
  upload.single("artworks"),
  artworkController.uploadArtwork
); // Use multer here

router.get("/", authMiddleware, artworkController.fetchArtworks);

// router.get("/:id", artworkController.fetchArtworkById);

router.delete("/delete/:id", authMiddleware, artworkController.deleteArtwork);

//Toggle like
router.patch("/:id/like", authMiddleware, artworkController.toggleLikeArtwork);

// Fetch likes count for a specific artwork

router.get("/liked-items", authMiddleware, artworkController.getLikedItems);

module.exports = router;
