const express = require("express");
const router = express.Router();
const Product = require("../Controller/Product");

router.route("/add").post(Product.addNewProduct);
router.route("/update/:id").put(Product.updateProduct);
router.route("/:id").get(Product.getProductById);
router.route("/").get(Product.getAllProducts);
router.route("/delete/:id").delete(Product.deleteProduct); // New endpoint for deletion
router.route("/search/:id").get(Product.searchProducts); // New endpoint for searching

module.exports = router;
