import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturedSection from '../components/FeaturedSection'
// import TrailersSection from '../components/TrailersSection'
import NowShowing from '../components/NowShowing';
import { dummyShowsData } from '../assets/assets';
import Movies from './Movies';


const Home = () => {
  return (
    <>
      <HeroSection />
      {/* <FeaturedSection /> */}
      {/* <TrailersSection/> */}
      <NowShowing movies={dummyShowsData} />
      {/* <Movies /> */}

    </>
  )
}

export default Home