const Razorpay = require('razorpay');
require('dotenv').config();

// Initialize Razorpay with your key ID and secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID ,
  key_secret: process.env.RAZORPAY_KEY_SECRET ,
});

// Create a new Razorpay order
const createOrder = async (req, res) => {
    try {
      const { amount, currency = 'INR', receipt } = req.body;
      
      // Ensure amount is a number and convert to paise (multiply by 100)
      const amountInPaise = Math.round(parseFloat(amount) * 100);
      
      if (isNaN(amountInPaise)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid amount format'
        });
      }
  
      const options = {
        amount: amountInPaise,
        currency,
        receipt: receipt || `receipt_${Date.now()}`,
        payment_capture: 1
      };
  
      console.log('Creating Razorpay order with options:', options);
      const order = await razorpay.orders.create(options);
      
      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create payment order',
        error: error.message,
      });
    }
  };

// Verify payment signature
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Creating the hmac signature to verify payment
    const crypto = require('crypto');
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'YOUR_SECRET_KEY')
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    // Verify signature
    if (generatedSignature === razorpay_signature) {
      // Payment is successful
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
}; 