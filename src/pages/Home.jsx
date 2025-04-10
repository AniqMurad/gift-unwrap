import React from 'react'
import Navbar from '../components/Navbar'
import SubNavbar from '../components/SubNavbar'
import HeroSection from '../components/HeroSection'
import Trending from '../components/Trending'
import ProductPage from '../components/ProductPage'
import Categories from '../components/Categories'
import Review from '../components/Review'
import Services from '../components/Services'
import Blogs from '../components/Blogs'
import Partners from '../components/Partners'
import Offer from '../components/Offer'
import Footer from '../components/Footer'
import InstaSpace from '../components/InstaSpace'

const Home = () => {
    return (
        <div className='w-full h-auto'>
            <Navbar />
            <SubNavbar />
            <HeroSection />
            <Trending />
            <ProductPage title="Gifts for Him" category="giftsForHim" />
            <Categories />
            <ProductPage title="Birthday Gifts" category="birthday" />
            <Review />
            <Services />
            <InstaSpace />
            <Blogs />
            <Partners />
            <Offer />
            {<Footer />}
        </div>
    )
}

export default Home