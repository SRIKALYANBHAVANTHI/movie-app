const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  username: String,
  comment: String,
  rating: Number
});

const movieSchema = new mongoose.Schema({
  title: String,
  poster: String,
  rating: Number,
  reviews: [reviewSchema]  // embed reviews inside movie
});

module.exports = mongoose.model('Movie', movieSchema);
