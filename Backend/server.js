const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const artworkRoutes = require("./routes/artworkRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const artistRoutes = require("./routes/artistRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Middleware for parsing JSON bodies and enabling CORS for all routes
app.use(bodyParser.json());
app.use(cors());

// Define the uploads directory path
const uploadsDir = path.join(__dirname, "uploads");

// Check if the uploads directory exists, and create it if it doesn't
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Uploads directory created at:", uploadsDir);
} else {
  console.log("Uploads directory already exists at:", uploadsDir);
}

// Serve the uploads directory as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/auth", authRoutes);
app.use("/artworks", artworkRoutes);
app.use("/orders", orderRoutes);
app.use("/cart", cartRoutes);
app.use("/artist", artistRoutes);
app.use("/contact", contactRoutes);

app.get("/",(req,res)=>{
  res.json({message:"Good to go :-) Hello from backend"})
})

// Define the port from environment variables or use 5000 as a fallback
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
