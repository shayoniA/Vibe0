const mongoose = require('mongoose');
const CartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  qty: { type: Number, default: 1 },
  priceAtAdd: Number
});
module.exports = mongoose.model('CartItem', CartItemSchema);
