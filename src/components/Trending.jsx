import React, { useRef, useEffect } from 'react';
import eidimage from '../assets/Eid.png';
import birthdayimage from '../assets/birthday.png';
import companyimage from '../assets/company.webp';
import weddingGiftImg from '../assets/weddingGiftsImg.jpg';
import box2 from '../assets/box2.jpg';
import giftForhimImg from '../assets/giftForhimImg.webp';
import giftForKids from '../assets/giftforkids.jfif';
import { useNavigate } from 'react-router-dom';

const Trending = () => {
    const sliderRef = useRef(null);
    const navigate = useNavigate();

    const originalItems = [
        { image: companyimage, title: "Business", count: 12, url: "/Giftforcompanies" },
        { image: birthdayimage, title: "Birthday", count: 12, url: "/Giftforbirthday" },
        { image: giftForKids, title: "Kids", count: 12, url: "/Giftforbabies" },
        { image: box2, title: "For Her", count: 12, url: "/Giftforher" },
        { image: giftForhimImg, title: "For Him", count: 12, url: "/Giftforhim" },
        { image: weddingGiftImg, title: "Wedding", count: 12, url: "/Giftforwedding" },
        { image: eidimage, title: "Religious Events", count: 12, url: "/Giftforreligions" },
    ];

    const itemsToDuplicate = 7;
    const trendingItems = [...originalItems, ...originalItems.slice(0, itemsToDuplicate)];

    const handleItemClick = (url) => {
        if (url) {
            navigate(url);
        } else {
            console.warn("Navigation URL is missing for this item.");
        }
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        let animationId;
        let position = 0;
        const itemWidth = 200;
        const gap = 24;
        const totalItemWidth = itemWidth + gap;
        const resetPosition = originalItems.length * totalItemWidth;

        const animate = () => {
            // Removed the !isHovered check
            if (slider) {
                position += 0.5; // Controls the speed

                if (position >= resetPosition) {
                    slider.style.transition = 'none';
                    slider.style.transform = `translateX(0px)`;
                    position = 0;
                    void slider.offsetWidth;
                    slider.style.transition = 'transform 0.3s ease-out';
                } else {
                    slider.style.transform = `translateX(-${position}px)`;
                }
            }
            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [originalItems.length]); // Removed isHovered from dependencies

    return (
        <div className='bg-[#FCFCFC]'>
            <div className='m-4 p-4 px-4 sm:px-8 md:px-12 lg:px-16'>
                <div className='text-4xl font-semibold flex justify-center mb-8'>Trending Right Now</div>
                <div
                    className='relative overflow-hidden my-5 mx-auto cursor-grab active:cursor-grabbing'
                >
                    <div
                        ref={sliderRef}
                        className='flex gap-4 sm:gap-5 md:gap-6'
                        style={{ width: 'fit-content' }}
                    >
                        {trendingItems.map((item, index) => (
                            <div
                                key={index}
                                className='flex flex-col items-center flex-shrink-0 cursor-pointer group min-w-[140px] sm:min-w-[160px] md:min-w-[180px]'
                                onClick={() => handleItemClick(item.url)}
                            >
                                <div className='rounded-full overflow-hidden w-[250px] h-[250px] sm:w-[140px] sm:h-[140px] md:w-[180px] md:h-[180px] shadow-md group-hover:shadow-lg transition-shadow duration-200'>
                                    <img src={item.image} alt={item.title} className='w-full h-full object-cover' />
                                </div>
                                <div className='flex justify-center mt-3 text-center'>
                                    <p className='font-semibold text-base group-hover:text-black transition-colors duration-200'>{item.title} 
                                        {/* <span className='text-[#A0A0A0] text-sm font-normal'>({item.count})</span> */}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trending;