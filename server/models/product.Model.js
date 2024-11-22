const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: "Sample Product",
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
});
const createProduct = async () => {
  const product = new Product({
     name: "Sample Product",
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
  });
  await product.save();
  console.log("Product created with ID:", product._id);
};
createProduct();

const Product = mongoose.model('Product', productSchema);