import React, { useRef, useEffect, useState } from 'react';
import eidimage from '../assets/Eid.png';
import birthdayimage from '../assets/birthday.png';
import companyimage from '../assets/company.webp';
import weddingGiftImg from '../assets/weddingGiftsImg.jpg';
import box2 from '../assets/box2.jpg';
import giftForhimImg from '../assets/giftForhimImg.webp';
import giftForKids from '../assets/giftforkids.jfif';
import { useNavigate } from 'react-router-dom';

const Trending = () => {
    const navigate = useNavigate();
    const scrollContainerRef = useRef(null);
    const isDraggingRef = useRef(false);
    const [isHovered, setIsHovered] = useState(false);
    const [itemWidth, setItemWidth] = useState(0);

    const originalItems = [
        { image: companyimage, title: "Business", url: "/Giftforcompanies" },
        { image: birthdayimage, title: "Birthday", url: "/Giftforbirthday" },
        { image: giftForKids, title: "Kids", url: "/Giftforbabies" },
        { image: box2, title: "For Her", url: "/Giftforher" },
        { image: giftForhimImg, title: "For Him", url: "/Giftforhim" },
        { image: weddingGiftImg, title: "Wedding", url: "/Giftforwedding" },
        { image: eidimage, title: "Religious Events", url: "/Giftforreligions" },
    ];

    const startIndex = originalItems.length;
    const trendingItems = [...originalItems, ...originalItems, ...originalItems]; // triple loop

    const handleItemClick = (url) => {
        if (url) navigate(url);
    };

    const handleTouchStart = () => {
        isDraggingRef.current = true;
    };

    const handleTouchEnd = () => {
        isDraggingRef.current = false;
    };

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const visibleWidth = container.offsetWidth;
        const totalScrollWidth = container.scrollWidth;

        // Loop forward
        if (container.scrollLeft >= totalScrollWidth - visibleWidth - (itemWidth * 3)) {
            container.scrollLeft = startIndex * itemWidth;
        }
        // Loop backward
        else if (container.scrollLeft <= 0) {
            container.scrollLeft = totalScrollWidth - visibleWidth - (itemWidth * 6);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        container.scrollLeft = startIndex * itemWidth;

        let animationId;
        const autoScrollSpeed = 0.5;

        const animate = () => {
            if (container && !isHovered && !isDraggingRef.current) {
                container.scrollLeft += autoScrollSpeed;

                const visibleWidth = container.offsetWidth;
                const totalScrollWidth = container.scrollWidth;

                if (container.scrollLeft >= totalScrollWidth - visibleWidth - (itemWidth * 3)) {
                    container.scrollLeft = startIndex * itemWidth;
                }
            }
            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationId);
    }, [isHovered, itemWidth]);

    useEffect(() => {
        const updateItemWidth = () => {
            const firstItem = document.querySelector('.trending-item');
            if (firstItem) {
                setItemWidth(firstItem.offsetWidth);
            }
        };
        updateItemWidth();
        window.addEventListener('resize', updateItemWidth);
        return () => window.removeEventListener('resize', updateItemWidth);
    }, []);

    return (
        <div className="bg-[#FCFCFC]">
            <div className="m-4 p-4 px-4 sm:px-8 md:px-12 lg:px-16">
                <div className="text-3xl sm:text-4xl font-semibold flex justify-center mb-8">Trending Right Now</div>

                <div
                    ref={scrollContainerRef}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onScroll={handleScroll}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative my-5 mx-auto cursor-grab active:cursor-grabbing overflow-x-scroll overflow-y-hidden"
                    style={{
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    <style>{`div::-webkit-scrollbar { display: none; }`}</style>

                    <div className="flex gap-2 sm:gap-6 w-fit">
                        {trendingItems.map((item, index) => (
                            <div
                                key={index}
                                className="trending-item flex flex-col items-center flex-shrink-0 cursor-pointer group min-w-[30vw] max-w-[30vw] sm:min-w-[180px] sm:max-w-[180px] md:min-w-[220px] md:max-w-[220px]"
                                onClick={() => handleItemClick(item.url)}
                            >
                                <div className="rounded-full overflow-hidden w-[100px] h-[100px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] shadow-md group-hover:shadow-lg transition-shadow duration-200">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex justify-center mt-3 text-center">
                                    <p className="font-semibold text-base group-hover:text-black transition-colors duration-200">
                                        {item.title}
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