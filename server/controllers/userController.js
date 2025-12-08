import Booking from "../models/Booking.js";
import { clerkClient } from "@clerk/express";
import Movie from "../models/Movie.js";

// ==============================
// GET USER BOOKINGS
// ==============================
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.auth().userId;

    const bookings = await Booking.find({ user: userId })
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ==============================
// ADD / REMOVE FAVORITE MOVIE
// ==============================
export const addShowFavorite = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.auth().userId;

    const user = await clerkClient.users.getUser(userId);

    // Ensure favorites array exists
    if (!user.privateMetadata.favorites) {
      user.privateMetadata.favorites = [];
    }

    const favorites = user.privateMetadata.favorites;

    // ADD or REMOVE FAVORITE
    if (!favorites.includes(movieId)) {
      favorites.push(movieId); // add favorite
    } else {
      user.privateMetadata.favorites = favorites.filter(
        (item) => item !== movieId
      ); // remove favorite
    }

    // Save updated metadata
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: user.privateMetadata,
    });

    res.json({ success: true, message: "Favorite updated successfully." });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ==============================
// GET FAVORITES LIST
// ==============================
export const getFavorites = async (req, res) => {
  try {
    const user = await clerkClient.users.getUser(req.auth().userId);

    // Always use "favorites" (not favourites)
    const favorites = user.privateMetadata.favorites || [];

    const movies = await Movie.find({ _id: { $in: favorites } });

    res.json({ success: true, movies });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
