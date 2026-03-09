import HomeNav from '../../components/Landing/HomeNav'
import Hero from '../../components/Landing/Hero'
import Features from '../../components/Landing/Features'
import Footer from '../../components/Landing/Footer'

const Home = () => {
  return (
    <div className='overflow-x-hidden bg-gradient-to-b from-cyan-50/30 via-white to-amber-50/30'>
      <HomeNav />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}

export default Home
