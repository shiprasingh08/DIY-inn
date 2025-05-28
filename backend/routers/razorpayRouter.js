const express = require('express');
const { createOrder, verifyPayment } = require('../controllers/razorpayController');

const router = express.Router();

// Create a new Razorpay order
router.post('/create-order', createOrder);

// Verify the payment
router.post('/verify-payment', verifyPayment);

module.exports = router; 