const express = require('express');
const { createArtwork, getAllArtworks } = require('../controllers/artworkController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Configure multer to store uploaded images in the 'uploads/' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the destination for uploaded files
    },
    filename: (req, file, cb) => {
        // Create a unique filename with the original file extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext); // Return the new filename
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Accept only png and jpeg formats
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: File upload only supports the following filetypes - ' + filetypes);
        }
    }
}); 

const router = express.Router();

// Route for uploading artwork
router.post('/uploadartwork', authMiddleware, upload.single('imageurl'), createArtwork);

// Route for getting all artworks
router.get('/', getAllArtworks);

module.exports = router;
