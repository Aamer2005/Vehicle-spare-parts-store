const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  pNo: { type: String, required: true, unique: true },
  crossReference: [String],
  category: { type: String, required: true },
  description: String,
  type: String,
  image: { type: String } // <-- new field for image URL
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);