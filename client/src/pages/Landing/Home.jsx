import React from 'react'
import HomeNav from '../../components/Landing/HomeNav'
import Hero from '../../components/Landing/Hero'
import Features from '../../components/Landing/Features'
import Footer from '../../components/Landing/Footer'

const Home = () => {
  return (
    <div>
      <HomeNav/>
      <Hero/>
      <Features/>
      <Footer/>
    </div>
  )
}

export default Home