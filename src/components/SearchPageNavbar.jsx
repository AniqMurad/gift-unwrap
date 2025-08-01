import Logo from '../assets/logo.png'
import React from 'react'
import { UsersIcon, CartIcon, HeartIcon, SearchIcon, SearchLine, RightHalfIcon, } from './icons'
import { useNavigate } from 'react-router-dom';

const SearchPageNavbar = ({ title, title2, titleHome, backgroundColor }) => {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div style={{ backgroundColor }}>

            {/* Search Result Section */}
            <div className='text-center py-4 sm:py-6 lg:py-8'>
                <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900'>{title}</h2>
                <div className='flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2'>
                    {titleHome && (
                        <>
                            <span 
                                className="cursor-pointer hover:text-gray-800 transition-colors duration-200"
                                onClick={handleLogoClick}
                            >
                                {titleHome}
                            </span>
                            <RightHalfIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                        </>
                    )}

                    <span className='text-gray-400'>{title}</span>

                    {title2 && (
                        <>
                            <RightHalfIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                            <span className='text-gray-400'>{title2}</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchPageNavbar;
