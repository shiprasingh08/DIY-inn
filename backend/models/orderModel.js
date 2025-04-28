const { model, Schema } = require('../connection');
const yup = require('yup');

// Yup validation schema for orders
const orderValidation = yup.object().shape({
  customerName: yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .required('Customer name is required'),
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  product: yup.string()
    .required('Product is required'),
  quantity: yup.number()
    .positive('Quantity must be positive')
    .integer('Quantity must be a whole number')
    .required('Quantity is required'),
  customization: yup.string()
    .max(500, 'Customization details must not exceed 500 characters'),
  shippingAddress: yup.string()
    .min(10, 'Shipping address must be at least 10 characters')
    .required('Shipping address is required'),
  billingAddress: yup.string()
    .min(10, 'Billing address must be at least 10 characters')
    .required('Billing address is required'),
  status: yup.string()
    .oneOf(['pending', 'processing', 'shipped', 'delivered', 'cancelled', ''], 'Invalid order status')
});

const orderSchema = new Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  customization: { type: String },
  shippingAddress: { type: String, required: true },
  billingAddress: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'pending', enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] }
});

// Add a static method to validate order data
orderSchema.statics.validate = async function(orderData) {
  return await orderValidation.validate(orderData, { abortEarly: false });
};

module.exports = model('Order', orderSchema);
