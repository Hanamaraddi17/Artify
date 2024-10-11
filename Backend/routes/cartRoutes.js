const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

router.post('/add', cartController.addToCart);
router.delete('/remove/:artwork_id', cartController.removeFromCart);
router.get('/', cartController.fetchCartItems);

module.exports = router;
