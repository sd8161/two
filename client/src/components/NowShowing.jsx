import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { StarIcon } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import timeFormat from '../lib/timeFormat';

const NowShowing = ({ movies }) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20">
      <h2 className="text-white text-2xl font-bold mb-6">Now Showing</h2>
      <Slider {...settings}>
        {movies.map((movie, index) => (
          <div key={index} className="px-3">
            <div className="flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 h-full">
              <img
                src={movie.backdrop_path}
                onClick={() => {
                  navigate(`/movies/${movie._id}`);
                  scrollTo(0, 0);
                }}
                alt={movie.title}
                className="rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer"
              />

              <p className="font-semibold mt-2 truncate">{movie.title}</p>

              <p className="text-sm text-gray-400 mt-2">
                {new Date(movie.release_date).getFullYear()} •{' '}
                {movie.genres.slice(0, 2).map((g) => g.name).join(' | ')} •{' '}
                {timeFormat(movie.runtime)}
              </p>

              <div className="flex items-center justify-between mt-4 pb-3">
                <button
                  onClick={() => {
                    navigate(`/movies/${movie._id}`);
                    scrollTo(0, 0);
                  }}
                  className="px-4 py-2 text-xs bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
                >
                  Buy Tickets
                </button>

                <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
                  <StarIcon className="w-4 h-4 text-primary fill-primary" />
                  {movie.vote_average.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
       <div className='flex justify-center mt-20'>
        <button
          onClick={() => {
            navigate('/movies')
            scrollTo(0, 0)
          }}
          className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default NowShowing;
