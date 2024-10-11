const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.post('/place', orderController.placeOrder);
router.get('/', orderController.fetchOrders);

module.exports = router;
