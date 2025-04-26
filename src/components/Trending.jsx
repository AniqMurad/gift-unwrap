import React, { useRef, useEffect } from 'react'; // Removed useState
import ramadanimage from '../assets/ramadan.png';
import eidimage from '../assets/eid.png';
import birthdayimage from '../assets/birthday.png';
import anniversaryimage from '../assets/anniversary.png';
import weddingGiftImg from '../assets/weddingGiftsImg.jpg';
import box2 from '../assets/box2.jpg';
import giftForhimImg from '../assets/giftForhimImg.webp';
import giftForKids from '../assets/giftforkids.jfif';
import { useNavigate } from 'react-router-dom';

const Trending = () => {
    const sliderRef = useRef(null);
    // Removed isHovered state: const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    // Original items with URLs
    const originalItems = [
        { image: anniversaryimage, title: "Anniversary", count: 12, url: "/Giftforanniversary" }, // Corrected URL
        { image: birthdayimage, title: "Birthday Gifts", count: 12, url: "/Giftforbirthday" },
        { image: giftForKids, title: "Kids Gifts", count: 12, url: "/Giftforbabies" },
        { image: box2, title: "Gift for her", count: 12, url: "/Giftforher" }, // Corrected case
        { image: giftForhimImg, title: "Gifts for him", count: 12, url: "/Giftforhim" }, // Corrected case
        { image: weddingGiftImg, title: "Wedding Gifts", count: 12, url: "/Giftforwedding" },
        { image: eidimage, title: "Religious Events Gifts", count: 12, url: "/Giftforreligions" },
    ];

    // Duplicate the first few items (e.g., 5) for a seamless loop
    const itemsToDuplicate = 5;
    const trendingItems = [...originalItems, ...originalItems.slice(0, itemsToDuplicate)];

    // Define the navigation handler function
    const handleItemClick = (url) => {
        if (url) {
            navigate(url);
        } else {
            console.warn("Navigation URL is missing for this item."); // Add a warning if URL is missing
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
            <div className='m-4 p-4 px-16'>
                <div className='text-4xl flex justify-center mb-8'>Trending Right Now</div>
                <div
                    className='relative overflow-hidden my-5 mx-auto cursor-grab active:cursor-grabbing'
                    // Removed onMouseEnter and onMouseLeave handlers
                >
                    <div
                        ref={sliderRef}
                        className='flex gap-6'
                        style={{ width: 'fit-content' }}
                    >
                        {trendingItems.map((item, index) => (
                            <div
                                key={index}
                                className='flex flex-col items-center min-w-[200px] flex-shrink-0 cursor-pointer group' // Added cursor-pointer and group
                                onClick={() => handleItemClick(item.url)} // Ensure this calls the defined handler
                            >
                                <div className='rounded-full overflow-hidden w-[180px] h-[180px] shadow-md group-hover:shadow-lg transition-shadow duration-200'>
                                    <img src={item.image} alt={item.title} className='w-full h-full object-cover' />
                                </div>
                                <div className='flex justify-center mt-3 text-center'>
                                    <p className='font-semibold text-base group-hover:text-black transition-colors duration-200'>{item.title} <span className='text-[#A0A0A0] text-sm font-normal'>({item.count})</span></p>
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