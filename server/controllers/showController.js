import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";

// -----------------------------------------
// GET MOVIES STORED IN DATABASE
// -----------------------------------------
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json({ success: true, movies });
  } catch (error) {
    console.error("GET MOVIES ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

// -----------------------------------------
// TMDB NOW PLAYING MOVIES
// -----------------------------------------
export const getShowsByMovieId = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
      }
    );

    res.json({ success: true, movies: data.results });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// -----------------------------------------
// ADD SHOW TO A MOVIE
// -----------------------------------------
export const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;

    let movie = await Movie.findById(movieId);

    // If movie not in DB, fetch from TMDB
    if (!movie) {
      const movieDetailsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
        }
      );

      const md = movieDetailsResponse.data;

      const movieDetails = {
        _id: movieId,
        title: md.title,
        overview: md.overview,
        poster_path: md.poster_path,
        backdrop_path: md.backdrop_path,
        genres: md.genres,
        release_date: md.release_date,
        original_language: md.original_language,
        tagline: md.tagline || "",
        vote_average: md.vote_average,
        runtime: md.runtime,
      };

      movie = await Movie.create(movieDetails);
    }

    // SHOW CREATION
    const showsToCreate = [];

    showsInput.forEach((show) => {
      const showDate = show.date;
      show.time.forEach((time) => {
        const dateTimeString = `${showDate}T${time}`;
        showsToCreate.push({
          movie: movie._id,
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {},
        });
      });
    });

    if (showsToCreate.length > 0) {
      await Show.insertMany(showsToCreate);
    }

    res.json({ success: true, message: "Shows added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// -----------------------------------------
// GET ALL UPCOMING SHOWS (UNIQUE MOVIES)
// -----------------------------------------
export const getShows = async (req, res) => {
  try {
    const shows = await Show.find({
      showDateTime: { $gte: new Date() },
    }).sort({ showDateTime: 1 });

    const uniqueMovies = new Map();

    for (const s of shows) {
      const movieId = s.movie; // this is the string ID

      if (!uniqueMovies.has(movieId)) {
        const movie = await Movie.findById(movieId);

        if (movie) {
          uniqueMovies.set(movieId, movie);
        }
      }
    }

    res.json({ success: true, shows: Array.from(uniqueMovies.values()) });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


// -----------------------------------------
// GET SHOWS FOR SPECIFIC MOVIE
// -----------------------------------------
export const getShow = async (req, res) => {
  try {
    const { movieId } = req.params;

    const shows = await Show.find({
      movie: movieId,
      showDateTime: { $gte: new Date() },
    });

    const movie = await Movie.findById(movieId);

    const dateTime = {};

    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split("T")[0];
      if (!dateTime[date]) dateTime[date] = [];

      dateTime[date].push({
        time: show.showDateTime,
        showId: show._id,
      });
    });

    res.json({ success: true, movie, dateTime });
  } catch (error) {
    console.log("🔥 SERVER ERROR →", error);
    res.json({ success: false, message: error.message });
  }
};
