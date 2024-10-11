
// pfpUpload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Function to sanitize the filename for profile pictures
const sanitizePfpFileName = (title) => {
  return title.replace(/[^a-z0-9]/gi, "_").toLowerCase(); // Replace invalid characters with underscores
};

// Function to create the directory if it doesn't exist
const createDirectoryIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true }); // Create the directory recursively
  }
};

// Configure multer storage for profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/pfp/"; // Directory for profile picture uploads
    createDirectoryIfNotExists(dir); // Create directory if it doesn't exist
    cb(null, dir); // Set the destination for profile picture uploads
  },
  filename: (req, file, cb) => {
    const title = req.body.fullname || "untitled_profile"; // Get the title from the request body, default to "untitled_profile"
    const sanitizedTitle = sanitizePfpFileName(title); // Sanitize the title for a valid filename
    const ext = path.extname(file.originalname);
    const newFileName = `${sanitizedTitle}_${Date.now()}${ext}`; // Combine sanitized title with timestamp and extension
    cb(null, newFileName); // Return the new filename
  },
});

// Create multer upload instance for profile pictures
const uploadPfp = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // Limit file size to 2MB
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

module.exports = uploadPfp;
