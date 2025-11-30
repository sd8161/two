import React, { useState } from 'react';
import BlurCircle from './BlurCircle';
import ReactPlayer from 'react-player';
import { dummyTrailers } from '../assets/assets';
import { PlayCircle } from 'lucide-react';

const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

    console.log("dummyTrailers:", dummyTrailers);
  console.log("currentTrailer:", currentTrailer);

  return (
    <>
      {/* Main Player */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
        <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto">
          Trailers
        </p>
        <div className="relative mt-6">
          <BlurCircle top="-100px" right="-100px" />
          <div className="max-w-[960px] mx-auto rounded-lg overflow-hidden">
            <ReactPlayer
              url={currentTrailer.videoUrl}
              controls
               playing={true}
              width="100%"
              height="540px"
              className="rounded-xl"

              config={{
    youtube: {
      playerVars: {
        showinfo: 0,
        modestbranding: 1,
        rel: 0,
      },
    },
  }}
/>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-10 px-6 md:px-16 lg:px-24 xl:px-44 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyTrailers.map((trailer, index) => (
          <div
            key={index}
            className="relative group cursor-pointer rounded-lg overflow-hidden"
            onClick={() => setCurrentTrailer(trailer)}
          >
            <img
              src={trailer.image}
              alt={`Trailer ${index + 1}`}
              className="rounded-lg w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Play icon overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayCircle className="text-white w-10 h-10" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TrailersSection;
