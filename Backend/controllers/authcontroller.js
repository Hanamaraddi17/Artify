const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Signup
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Validation: Ensure username, email, and password are not empty and meet minimum length requirements
  if (!username || username.length < 3) {
    return res
      .status(400)
      .json({ error: "Username must be at least 3 characters long." });
  }
  if (!email || email.length < 5) {
    return res
      .status(400)
      .json({ error: "Email must be at least 5 characters long." });
  }
  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)";

    db.query(query, [username, email, hashedPassword], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res
        .status(201)
        .json({ message: "User created", userId: results.insertId });
    });
  } catch (error) {
    res.status(500).json({ error: "Signup failed." });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validation: Ensure email and password are provided and meet minimum length requirements
  if (!email || email.length < 5) {
    return res
      .status(400)
      .json({ error: "Email must be at least 5 characters long." });
  }
  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long." });
  }

  const query = "SELECT * FROM Users WHERE email = ?";

  db.query(query, [email], async (error, results) => {
    if (error || results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Include username in the response
    res.json({ token, username: user.username });
  });
};

// Delete user account
exports.deleteAccount = (req, res) => {
  const user_id = req.user.id; // Extracted from token in middleware

  const query = "DELETE FROM Users WHERE id = ?";
  db.query(query, [user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error deleting account." });
    }
    res.status(200).json({ message: "Account deleted successfully." });
  });
};
