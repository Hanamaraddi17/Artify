const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Add CORS middleware
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const artworkRoutes = require("./routes/artworkRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const artistRoutes = require("./routes/artistRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

const fs = require("fs");
const path = require("path");

// Define the uploads directory path
const uploadsDir = path.join(__dirname, "uploads");

// Check if the uploads directory exists, and create it if it doesn't
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }); // Create the uploads directory
  console.log("Uploads directory created at:", uploadsDir);
} else {
  console.log("Uploads directory already exists at:", uploadsDir);
}

app.use("/auth", authRoutes);
app.use("/artworks", artworkRoutes);
app.use("/orders", orderRoutes);
app.use("/cart", cartRoutes);
app.use("/artist", artistRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
