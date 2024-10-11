const express = require('express');
const artworkController = require('../controllers/artworkController'); // Ensure this path is correct
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware.js");
const upload = require("../config/multer/artworkUpload"); // Import the multer configuration

// Use the correct method from the controller
router.post('/upload', authMiddleware, upload.single('artworks'), artworkController.uploadArtwork); // Use multer here
router.get('/', artworkController.fetchArtworks);
router.get('/:id', artworkController.fetchArtworkById); // Ensure consistency with artworkController
router.delete('/:id', authMiddleware, artworkController.deleteArtwork);
// Increment like count for an artwork
router.patch('/:id/like', authMiddleware, artworkController.incrementLike);
// Fetch likes count for a specific artwork
router.get('/:id/likes', artworkController.fetchLikes);



module.exports = router;
