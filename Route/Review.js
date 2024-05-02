const express = require('express');
const router = express.Router();
const Review = require('../Controller/Review');

router.route('/add').post(Review.addNewReview);
router.route('/get').get(Review.getAllReviews);

module.exports = router;
