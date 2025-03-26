import Logo from '../assets/logo.png'
import React from 'react'
import { UsersIcon, CartIcon, HeartIcon, SearchIcon, SearchLine, RightHalfIcon, } from './icons'
import { useNavigate } from 'react-router-dom';

const SearchPageNavbar = ({ title, title2, titleHome }) => {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className='bg-[#FBF4E8]'>
            <div className="flex items-center justify-between px-16 py-4 border-[#E9E9E9]">
                <div className='flex items-center gap-8'>
                    <div className='cursor-pointer' onClick={handleLogoClick}>
                        <img src={Logo} alt='Gift Unwrap' className='h-10' />
                    </div>
                    <button className='font-medium font-semibold text-sm tracking-wide hover:text-gray-600 transition'>
                        CATEGORIES
                    </button>
                    <button className='font-medium font-semibold text-sm tracking-wide hover:text-gray-600 transition'>
                        RECIPIENTS
                    </button>
                    <button className='font-medium font-semibold text-sm tracking-wide hover:text-gray-600 transition'>
                        OCCASIONS
                    </button>
                    <button className='font-medium font-semibold text-sm tracking-wide hover:text-gray-600 transition'>
                        PERSONALIZATION METHOD
                    </button>
                    <button className='font-medium font-semibold text-sm tracking-wide hover:text-gray-600 transition'>
                        BLOG
                    </button>
                </div>
                <div className='flex gap-5 items-center'>
                    <SearchIcon color="#1F1F1F"/>
                    <SearchLine />
                    <UsersIcon />
                    <HeartIcon />
                    <CartIcon />
                </div>
            </div>

            {/* Search Result Section */}
            <div className='text-center py-8'>
                <h2 className='text-4xl font-semibold text-gray-900'>{title}</h2>
                <div className='flex items-center justify-center gap-2 text-sm text-gray-600 mt-2'>
                    {titleHome && (
                        <>
                            <span>{titleHome}</span>
                            <RightHalfIcon className="w-4 h-4 text-gray-500" />
                        </>
                    )}

                    <span className='text-gray-400'>{title}</span>

                    {title2 && (
                        <>
                            <RightHalfIcon className="w-4 h-4 text-gray-500" />
                            <span className='text-gray-400'>{title2}</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchPageNavbar;
