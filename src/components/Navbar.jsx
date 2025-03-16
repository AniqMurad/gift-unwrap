import Logo from '../assets/logo.png'
import React from 'react'
import  { UsersIcon, CartIcon, HeartIcon } from './icons'

const Navbar = () => {
    return (
        <div className="flex items-center justify-between bg-[#ffff] px-16 py-3 border-b-2 border-solid border-[#E9E9E9]">
            <div>
                <img src={Logo} alt='' />
            </div>
            <div className='text-sm'>
                <input className='rounded-tl-md rounded-bl-md text-[#A0A0A0] w-100 border border-[#E9E9E9] py-2 px-4' placeholder='What are you looking for today?' />
                <button className='rounded-tr-md rounded-br-md text-sm font-normal border border-black bg-black text-white py-2 px-6 '>
                    SEARCH
                </button>
            </div>
            <div className='flex gap-5 items-center justify-between'>
                <UsersIcon />
                <HeartIcon />
                <CartIcon />
            </div>
        </div>
    )
}

export default Navbar