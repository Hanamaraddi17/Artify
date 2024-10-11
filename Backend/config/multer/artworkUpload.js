// artworkUpload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Function to sanitize the title to create a valid filename
const sanitizeArtworkFileName = (title) => {
  return title.replace(/[^a-z0-9]/gi, "_").toLowerCase(); // Replace invalid characters with underscores
};

// Function to create the directory if it doesn't exist
const createDirectoryIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true }); // Create the directory recursively
  }
};

// Configure multer storage for artwork uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/artworks/"; // Directory for artwork uploads
    createDirectoryIfNotExists(dir); // Create directory if it doesn't exist
    cb(null, dir); // Set the destination for artwork uploads
  },
  filename: (req, file, cb) => {
    const title = req.body.title || "untitled_artwork"; // Get the title from the request body, default to "untitled_artwork"
    const sanitizedTitle = sanitizeArtworkFileName(title); // Sanitize the title for a valid filename
    const ext = path.extname(file.originalname);
    const newFileName = `${sanitizedTitle}_${Date.now()}${ext}`; // Combine sanitized title with timestamp and extension
    cb(null, newFileName); // Return the new filename
  },
});

// Create multer upload instance for artworks
const uploadArtwork = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/; // Allowed file types
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: File upload only supports the following filetypes - " + filetypes);
    }
  },
});

module.exports = uploadArtwork;
