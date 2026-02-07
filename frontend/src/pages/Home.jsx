import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import DashboardPreview from '../components/DashboardPreview'
import About from '../components/About'
import CoreValues from '../components/CoreValues'
import Contact from '../components/Contact'
import Footer from '../components/footer'

const Home = () => {
  return (
    <>
        <Navbar/>
        <Hero/>
        <Features/>
        <DashboardPreview/>
        <About/>
        <CoreValues/>
        <Contact/>
        <Footer/>
    </>
  )
}

export default Home