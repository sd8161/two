import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/User.js";

const checkSeatAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);
    if (!showData) return false;

    const taken = selectedSeats.some(
      (seat) => showData.occupiedSeats[seat]
    );

    return !taken;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { showId, selectedSeats } = req.body;

    const isAvailable = await checkSeatAvailability(showId, selectedSeats);
    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Selected seats are not available",
      });
    }

    const showData = await Show.findById(showId).populate("movie");

    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats,
    });

    selectedSeats.forEach((seat) => {
      showData.occupiedSeats[seat] = userId;
    });

    showData.markModified("occupiedSeats");
    await showData.save();

    res.json({ success: true, message: "Booked successfully" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);

    const occupiedSeats = Object.keys(showData.occupiedSeats);

    res.json({ success: true, occupiedSeats });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

