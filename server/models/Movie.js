import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  _id: {
    type: String, // TMDB ID stored as string
    required: true
  },
  title: String,
  overview: String,
  poster_path: String,
  backdrop_path: String,
  genres: Array,
  release_date: String,
  original_language: String,
  tagline: String,
  vote_average: Number,
  runtime: Number
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
