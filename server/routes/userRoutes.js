import express from "express";
import { 
  getFavorites, 
  getUserBookings, 
  addShowFavorite 
} from "../controllers/userController.js";

const userRouter = express.Router();

// Get all bookings for the logged-in user
userRouter.get("/bookings", getUserBookings);

// Add or remove favorite movie
userRouter.post("/update-favorite", addShowFavorite);

// Get list of favorite movies
userRouter.get("/favorites", getFavorites);

export default userRouter;
