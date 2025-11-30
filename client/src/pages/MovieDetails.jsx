import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyShowsData, dummyDateTimeData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import { StarIcon, PlayCircle, Heart } from "lucide-react";
import timeFormat from "../lib/timeFormat";
import DateSelect from "../components/DateSelect";
import NowShowing from "../components/NowShowing";
import Loading from "../components/Loading";   // ✅ import here

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const foundMovie = dummyShowsData.find((m) => String(m._id) === id);

      if (foundMovie) {
        setMovie(foundMovie);
        setLoading(false);
      } else {
        // ❌ stay in loading forever for wrong id
        setMovie(null);
        setLoading(true);
      }
    }, 800);
  }, [id]);

  // ✅ use Loading component here
  if (loading || !movie) {
    return <Loading />;
  }

  return (
    <div className="px-6 md:px-16 lg:px-40 pt-32 md:pt-52 text-white">
      {/* Poster + Info */}
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover shadow-lg"
        />

        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />

          <p className="text-primary uppercase font-medium">
            {movie.original_language === "en"
              ? "English"
              : movie.original_language}
          </p>

          <h1 className="text-4xl font-semibold max-w-96">{movie.title}</h1>

          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {movie.vote_average.toFixed(1)} User Rating
          </div>

          {movie.tagline && (
            <p className="italic text-gray-400">"{movie.tagline}"</p>
          )}

          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {movie.overview}
          </p>

          <p className="mt-2 text-sm text-gray-300">
            {timeFormat(movie.runtime)} •{" "}
            {movie.genres.map((g) => g.name).join(", ")} •{" "}
            {movie.release_date.split("-")[0]}
          </p>

          <div className="flex items-center flex-wrap gap-4 mt-4">
            <button className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95">
              <PlayCircle className="w-5 h-5" /> Watch Trailer
            </button>
            <a
              href="#dateSelect"
              className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95"
            >
              Buy Tickets
            </a>
            <button>
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <p className="text-lg font-medium mt-20">Your Favourite Cast</p>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-4 w-max px-4">
          {movie.casts.slice(0, 12).map((cast, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={cast.profile_path}
                alt={cast.name}
                className="rounded-full h-20 md:h-20 aspect-square object-cover"
              />
              <p className="font-medium text-xs mt-3">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      <DateSelect dateTime={dummyDateTimeData} id={id} />

      {/* You May Also Like */}
      <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>
      <NowShowing movies={dummyShowsData.filter((m) => m._id !== movie._id)} />

      {/* Go Back */}
      <div className="flex justify-center mt-20">
        <button
          onClick={() => navigate("/movies")}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
