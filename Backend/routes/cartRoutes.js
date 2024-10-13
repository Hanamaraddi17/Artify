const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");

router.post('/add',authMiddleware, cartController.addToCart);
router.delete('/remove/:artwork_id',authMiddleware,cartController.removeFromCart);
router.get('/',authMiddleware, cartController.fetchCartItems);

module.exports = router;
