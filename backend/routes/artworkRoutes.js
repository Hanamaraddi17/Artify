const express = require('express');
const { createArtwork, getAllArtworks, deleteArtwork } = require('../controllers/artworkController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Configure multer to store uploaded images in the 'uploads/' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the destination for uploaded files
    },
    filename: (req, file, cb) => {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext); // Return the new filename
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {

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


router.post('/uploadartwork', authMiddleware, upload.single('imageurl'), createArtwork);

router.get('/', getAllArtworks);
router.delete('/:id',authMiddleware, deleteArtwork);

module.exports = router;
