const express = require('express');
const { submitContactForm } = require('../controllers/contactController'); // New controller for saving to Excel
const router = express.Router();

// Route for form submission
router.post('/', submitContactForm);

module.exports = router;
