import React from 'react'
import Hero from './components/Home/hero'
import Timelapse from './components/Home/Timelapse'
import Camera360 from './components/Home/360camera'
import Tour from './components/Home/Tour'
import Benefits from './components/Home/Benefits'
import Footer from './components/Home/Footer'
import ScrollToTop from './components/Helper/ScrollToTop'
import ContactSection from './components/Home/ContactSection'

const Home = () => {
    return (
        <div className='overflow-hidden'>
            <Hero/>
            <Timelapse/>
            <Camera360 />
            <Tour />
            <Benefits />
            <ContactSection />
            <Footer />
            <ScrollToTop/>
        </div>
    )
}

export default Home
