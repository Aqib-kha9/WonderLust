const express = require("express");
const router = express.Router({ mergeParams: true});
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");
const Review = require("../models/review.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");





// Post review Route

router.post("/",isLoggedIn,validateReview, wrapAsync (reviewController.createReview));



router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));


module.exports = router;