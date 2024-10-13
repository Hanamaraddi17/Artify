const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");

router.post('/place',authMiddleware, orderController.placeOrder);
router.get('/', authMiddleware,orderController.fetchOrders);

module.exports = router;
