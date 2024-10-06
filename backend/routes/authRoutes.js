const express = require('express');
const { signup, login } = require('../controllers/authController'); // Adjust this path based on your project structure
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

module.exports = router;
