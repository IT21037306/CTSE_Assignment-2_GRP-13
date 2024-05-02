const Review = require('../Model/Review');

/**
 * Adds a new review to a product.
 */
const addNewReview = async (req, res) => {
  const { productId, name, rating, comment } = req.body;
  const NewReview = new Review({
    productId,
    name,
    rating,
    comment,
  });
  try {
    await NewReview.save();
    res.status(201).json(NewReview);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/**
 * Get all product reviews.
 */
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addNewReview, getAllReviews };
