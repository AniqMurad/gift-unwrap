import React, { useRef, useEffect, useState } from "react";
import eidimage from "../assets/Eid.png";
import birthdayimage from "../assets/birthday.png";
import companyimage from "../assets/company.webp";
import weddingGiftImg from "../assets/weddingGiftsImg.jpg";
import box2 from "../assets/box2.jpg";
import giftForhimImg from "../assets/giftForhimImg.webp";
import giftForKids from "../assets/giftforkids.jfif";
import { useNavigate } from "react-router-dom";

const Trending = () => {
  const sliderRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const originalItems = [
    { image: companyimage, title: "Business", url: "/Giftforcompanies" },
    { image: birthdayimage, title: "Birthday", url: "/Giftforbirthday" },
    { image: giftForKids, title: "Kids", url: "/Giftforbabies" },
    { image: box2, title: "For Her", url: "/Giftforher" },
    { image: giftForhimImg, title: "For Him", url: "/Giftforhim" },
    { image: weddingGiftImg, title: "Wedding", url: "/Giftforwedding" },
    { image: eidimage, title: "Religious Events", url: "/Giftforreligions" },
  ];

  // Clone head and tail for seamless looping
  const trendingItems = [
    ...originalItems.slice(-3), // tail clone
    ...originalItems,
    ...originalItems.slice(0, 3), // head clone
  ];

  const itemWidth = 200 + 24; // 200 width + 24 gap
  const startIndex = 3; // Index to center on original items
  const autoScrollSpeed = 0.5;

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Position to start of real items
    container.scrollLeft = startIndex * itemWidth;

    let animationId;

    const animate = () => {
      if (container) {
        container.scrollLeft += autoScrollSpeed;

        const visibleWidth = container.offsetWidth;
        const totalScrollWidth = container.scrollWidth;

        // Reset if we're about to hit the cloned tail
        if (
          container.scrollLeft >=
          totalScrollWidth - visibleWidth - itemWidth * 3
        ) {
          container.scrollLeft = startIndex * itemWidth;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleItemClick = (url) => {
    if (url) navigate(url);
  };

  // Handle seamless loop when user scrolls manually
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const visibleWidth = container.offsetWidth;
    const totalScrollWidth = container.scrollWidth;

    if (
      container.scrollLeft >=
      totalScrollWidth - visibleWidth - itemWidth * 3
    ) {
      container.scrollLeft = startIndex * itemWidth;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft = totalScrollWidth - visibleWidth - itemWidth * 6;
    }
  };

  return (
    <div className="bg-[#FCFCFC]">
      <div className="m-4 p-4 px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="text-4xl font-semibold flex justify-center mb-8">
          Trending Right Now
        </div>
        <div
          className="relative my-5 mx-auto cursor-grab active:cursor-grabbing"
          ref={scrollContainerRef}
          onScroll={handleScroll}
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Hide scrollbar for WebKit */}
          <style>
            {`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                        `}
          </style>

          <div
            ref={sliderRef}
            className="flex gap-6"
            style={{ width: "fit-content" }}
          >
            {trendingItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-shrink-0 cursor-pointer group min-w-[200px]"
                onClick={() => handleItemClick(item.url)}
              >
                <div className="rounded-full overflow-hidden w-[200px] h-[200px] sm:w-[200px] sm:h-[200px] md:w-[220px] md:h-[220px] shadow-md group-hover:shadow-lg transition-shadow duration-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
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
