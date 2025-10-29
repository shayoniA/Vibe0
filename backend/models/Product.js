const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  img1: String,
  category: String
});
module.exports = mongoose.model('Product', ProductSchema);
