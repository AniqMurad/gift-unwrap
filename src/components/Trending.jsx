import React, { useRef, useEffect, useState } from 'react'
import ramadanimage from '../assets/ramadan.png'
import eidimage from '../assets/eid.png'
import birthdayimage from '../assets/birthday.png'
import anniversaryimage from '../assets/anniversary.png'
import flowersimage from '../assets/flowers.png'

const Trending = () => {
    const sliderRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    
    const trendingItems = [
        { image: ramadanimage, title: "Ramadan", count: 12 },
        { image: eidimage, title: "Eid-ul-Fitr", count: 12 },
        { image: birthdayimage, title: "Birthday", count: 12 },
        { image: anniversaryimage, title: "Anniversary", count: 12 },
        { image: flowersimage, title: "Flowers & Bouquets", count: 12 },
        // Duplicate first few items to create seamless loop effect
        { image: ramadanimage, title: "Ramadan", count: 12 },
        { image: eidimage, title: "Eid-ul-Fitr", count: 12 },
        { image: birthdayimage, title: "Birthday", count: 12 }
    ];

    useEffect(() => {
        const slider = sliderRef.current;
        let animationId;
        let position = 0;
        
        const animate = () => {
            if (!isHovered && slider) {
                position += 0.5; // Controls the speed (lower is slower)
                
                // Reset position to create infinite loop effect
                if (position >= (trendingItems.length - 5) * 225) { // 225px is approx width of each item
                    position = 0;
                }
                
                slider.style.transform = `translateX(-${position}px)`;
            }
            animationId = requestAnimationFrame(animate);
        };
        
        animate();
        
        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [isHovered]);

    return (
        <div className='bg-[#FCFCFC]'>
            <div className='m-4 p-4 px-0'>
                <div className='text-4xl flex justify-center'>Trending Right Now</div>
                <div className='relative overflow-hidden my-5 mx-auto' 
                     >
                    <div 
                        ref={sliderRef}
                        className='flex transition-transform duration-300 gap-6'
                        style={{ width: 'fit-content' }}
                    >
                        {trendingItems.map((item, index) => (
                            <div key={index} className='flex flex-col items-center min-w-[200px]'>
                                <div className='rounded-[100px] overflow-hidden w-[180px] h-[180px]'>
                                    <img src={item.image} alt={item.title} className='w-full h-full object-cover' />
                                </div>
                                <div className='flex justify-center m-2 font-bold'>
                                    <p>{item.title} <span className='text-[#A0A0A0] text-xs'>({item.count})</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trending