const { model, Schema } = require('../connection');


const orderSchema = new Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  customization: { type: String },
  shippingAddress: { type: String, required: true },
  billingAddress: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: '' }
  
});

module.exports = model('Order', orderSchema);
