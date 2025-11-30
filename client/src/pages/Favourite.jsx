import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarIcon } from 'lucide-react';
import timeFormat from '../lib/timeFormat';
import { dummyShowsData } from '../assets/assets'; // Or replace with your real movie data source
import BlurCircle from '../components/BlurCircle';

const Favourite = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const navigate = useNavigate();

  // Simulate fetching data
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    setMovies(dummyShowsData); // Replace with API call if needed
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20">
      <BlurCircle top="150px" left='0px' />
      <BlurCircle bottom="50px" right='50px' />

      <h2 className="text-white text-2xl font-bold mb-6">Your Favourite Movies</h2>

      <div className="flex flex-wrap justify-center gap-8">
        {movies.slice(0, visibleCount).map((movie) => (
          <div
            key={movie._id}
            className="w-64 bg-gray-800 p-4 rounded-2xl hover:-translate-y-1 transition duration-300"
          >
            <img
              src={movie.backdrop_path}
              onClick={() => {
                navigate(`/movies/${movie._id}`);
                scrollTo(0, 0);
              }}
              alt={movie.title}
              className="rounded-lg h-52 w-full object-cover object-center cursor-pointer"
            />

            <p className="font-semibold mt-2 truncate text-white">{movie.title}</p>

            <p className="text-sm text-gray-400 mt-2">
              {new Date(movie.release_date).getFullYear()} •{' '}
              {movie.genres.slice(0, 2).map((g) => g.name).join(' | ')} •{' '}
              {timeFormat(movie.runtime)}
            </p>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => {
                  navigate(`/movies/${movie._id}`);
                  scrollTo(0, 0);
                }}
                className="px-4 py-2 text-xs bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
              >
                Buy Tickets
              </button>

              <p className="flex items-center gap-1 text-sm text-gray-400">
                <StarIcon className="w-4 h-4 text-primary fill-primary" />
                {movie.vote_average.toFixed(1)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < movies.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleShowMore}
            className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer text-white"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
};

export default Favourite;