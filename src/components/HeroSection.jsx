import React, { useEffect, useRef, useState } from "react";
import heroimg1 from "../assets/herosection1.png";
import heroimg2 from "../assets/herosection2.png";
import heroimg3 from "../assets/herosection3.png";
import img2 from "../assets/herosection2.1.png";
import img3 from "../assets/herosection2.2.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: heroimg1,
      heading: "Celebrate Women's Day",
      description:
        "Express appreciation, gratitude, and support for the women in your lives.",
      route: "/giftforher",
    },
    {
      image: heroimg2,
      heading: "Tiny Gifts for Tiny Joys",
      description:
        "Discover adorable and thoughtful baby gifts made to celebrate precious moment.",
      route: "/Giftforbabies",
    },
    {
      image: heroimg3,
      heading: "Make their Birthday Bright",
      description:
        "Surprise your friends and loved ones with heartfelt birthday gifts.",
      route: "/Giftforbirthday",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const autoPlay = setInterval(() => {
      const nextButton =
        carousel.querySelector('[data-carousel="next"]') ||
        carousel.querySelector(".absolute.right-1");

      if (nextButton) {
        nextButton.setAttribute("data-ignore-dropdown-close", "true");
        nextButton.click();
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 4000);

    return () => clearInterval(autoPlay);
  }, [slides.length]);

  const handleShopNowClick = (route) => {
    navigate(route);
  };

  const goToSlide = (index) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Calculate how many clicks needed to reach the target slide
    const currentIndex = currentSlide;
    let clicksNeeded = index - currentIndex;
    
    if (clicksNeeded < 0) {
      clicksNeeded = slides.length + clicksNeeded;
    }

    // Click next button the required number of times
    const nextButton = carousel.querySelector('[data-carousel="next"]');
    if (nextButton) {
      for (let i = 0; i < clicksNeeded; i++) {
        setTimeout(() => {
          nextButton.click();
        }, i * 100); // Small delay between clicks
      }
      setCurrentSlide(index);
    }
  };

  return (
    <div className="flex flex-col md:flex-row pt-14 pb-6 px-4 md:px-16 gap-8">
      {/* Left Carousel */}
      <div
        className="w-full md:w-[70%] rounded-[24px] overflow-hidden relative"
        ref={carouselRef}
      >
        <Carousel
          opts={{
            align: "start",
            loop: true, // Enable infinite loop
          }}
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative">
                  <img
                    src={slide.image}
                    className="rounded-[24px] shadow-md w-full h-full object-cover"
                    alt={`slide-${index}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[rgba(249,241,240,0.9)] via-[rgba(250,247,241,0.3)] to-transparent rounded-[24px] flex items-center px-4 md:px-10">
                    <div className="text-white max-w-md ml-2 md:ml-6">
                      <h2 className="text-xl md:text-5xl tracking-wide font-bold text-black leading-tight md:leading-[50px]">
                        {slide.heading}
                      </h2>
                      <p className="mt-2 md:mt-4 text-sm md:text-lg text-black">
                        {slide.description}
                      </p>
                      <button
                        className="mt-3 md:mt-5 px-4 md:px-6 py-2 shadow-lg text-sm text-white bg-black font-semibold rounded-md hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                        onClick={() => handleShopNowClick(slide.route)}
                      >
                        SHOP NOW
                      </button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Arrow buttons - hidden on mobile, visible on desktop */}
          <CarouselPrevious
            className="hidden md:flex absolute left-1 top-1/2 transform -translate-y-1/2 z-20 p-3 md:p-5 bg-white rounded-full shadow-lg border-0"
            data-carousel="prev"
          />
          <CarouselNext
            className="hidden md:flex absolute right-1 top-1/2 transform -translate-y-1/2 z-20 p-3 md:p-5 bg-white rounded-full shadow-lg border-0"
            data-carousel="next"
          />
        </Carousel>

        {/* Dot indicators - visible on mobile, hidden on desktop */}
        <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right Cards */}
      <div className="w-full xl:w-[30%] md:w-[30%] flex md:flex-col xl:flex-col gap-8">
        {/* Gifts For Him */}
        <div
          className="w-1/2 xl:w-full md:w-full bg-[#DEFBFF] cursor-pointer flex flex-col sm:flex-row justify-between items-center py-5 px-4 rounded-[24px] shadow-md md:flex-1"
          onClick={() => navigate("/giftforhim")}
        >
          <div className="text-center sm:text-left">
            <p className="bg-[#DB4444] text-white text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-md uppercase w-max mx-auto sm:mx-0">
              SAVE 10%
            </p>
            <p className="text-sm sm:text-2xl font-semibold mt-2">
              Gifts For Him
            </p>
            <p className="text-xs sm:text-lg mt-2 text-[#696C70]">
              Starting at{" "}
              <span className="text-[#DB4444] font-medium">PKR 4000</span>
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <img
              src={img2}
              className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] rounded-full object-cover"
              alt="Gift for Him"
            />
          </div>
        </div>

        {/* Gifts For Her */}
        <div
          className="w-1/2 xl:w-full md:w-full bg-[#F9F1F0] cursor-pointer flex flex-col sm:flex-row justify-between items-center py-5 px-4 rounded-[24px] shadow-md md:flex-1"
          onClick={() => navigate("/giftforher")}
        >
          <div className="text-center sm:text-left">
            <p className="bg-[#DB4444] text-white text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-md uppercase w-max mx-auto sm:mx-0">
              SAVE 10%
            </p>
            <p className="text-sm sm:text-2xl font-semibold mt-2">
              Gifts For Her
            </p>
            <p className="text-xs sm:text-lg mt-2 text-[#696C70]">
              Starting at{" "}
              <span className="text-[#DB4444] font-medium">PKR 3500</span>
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <img
              src={img3}
              className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] rounded-full object-cover"
              alt="Gift for Her"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;