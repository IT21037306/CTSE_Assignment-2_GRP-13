const Product = require("../Model/Product");

/**
 * Adds a new product to the database.
 */
const addNewProduct = async (req, res) => {
  const { name, price, quantity, description, category } = req.body;
  const newProduct = new Product({
    name,
    price,
    quantity,
    description,
    category,
  });
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/**
 * Updates an existing product in the database.
 */
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, description, category } = req.body;

  try {
    let updatedProduct = await Product.findByIdAndUpdate(id, {
      name,
      price,
      quantity,
      description,
      category,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    updatedProduct = await Product.findById(id);

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a product by its ID from the database.
 */
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all products from the database.
 */
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a product from the database.
 */
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Product.findById(id);

    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addNewProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  deleteProduct,
  searchProducts,
};
