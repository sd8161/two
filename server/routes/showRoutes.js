import express from "express";
import {
  getMovies,
  getShowsByMovieId,
  addShow,
  getShows,
  getShow,
} from "../controllers/showController.js";

const router = express.Router();

// IMPORTANT: order matters!

router.get("/list", getMovies);                     // Movie list from DB
router.post("/add", addShow);                       // Add shows
router.get("/movies/now-playing", getShowsByMovieId); // TMDB list
router.get("/", getShows);                          // All upcoming shows
router.get("/:movieId", getShow);                   // Shows for one movie

export default router;
