import React from 'react'
import SearchPageNavbar from '../components/SearchPageNavbar'
import error from '../assets/error.png'
import { LeftIcon } from '../components/icons'
import Footer from '../components/Footer'
import Navbar from '@/components/Navbar'

const Error = () => {
    return (
        <div>
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar backgroundColor='#FBF4E8' />
            <div className='bg-[#FBF4E8] flex items-center justify-between py-16'>
                <div className='w-[670px]'>
                    <img src={error} alt="404 Error" className='max-w-full h-auto' />
                </div>
                <div className='w-[490px] mr-[100px]'>
                    <h1 className='text-[140px] font-bold text-[#1F1F1F]'>404</h1>
                    <h2 className='text-[44px] font-semibold text-[#1F1F1F]'>Something Is Missing.</h2>
                    <p className='text-[18px] text-[#696C70] mt-2'>
                        The page you are looking for cannot be found. Take a break before trying again.
                    </p>
                    <button className='mt-4 inline-flex items-center'>
                        <span className='mr-2'><LeftIcon /></span> Back To Homepage
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Error