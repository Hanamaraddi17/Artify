const express = require('express');
const { createOrder, getUserOrders } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/new-order', authMiddleware, createOrder);
router.get('/myorders', authMiddleware, getUserOrders);

module.exports = router;
