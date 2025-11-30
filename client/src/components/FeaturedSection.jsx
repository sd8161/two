import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import { dummyShowsData } from '../assets/assets'

const FeaturedSection = () => {
  const navigate = useNavigate()

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
      {/* Blur circle only for background design */}
      <div className='relative pt-20'>
        {/* <BlurCircle top='0' right='0' /> */}
      </div>

      {/* Optional: You can leave a grid or blank space here */}
      <div className='mt-10'>
        {/* Content removed: Now Showing heading, View All button, MovieCards */}
        {/* This area is now intentionally empty */}
      </div>

      {/* Optional: you could add content later here */}
    </div>
  )
}

export default FeaturedSection
