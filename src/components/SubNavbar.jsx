import React, { useState, useEffect } from 'react';
import hover1 from "../assets/hover1.png"
import hoverSubOptions from '../components/hoverSubOptions'
import { useNavigate } from 'react-router-dom';

const SubNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const handleButtonClick = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown-button') && !event.target.closest('.dropdown-content')) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleTitleClick = (url) => {
    console.log("clicked", url);
    navigate(url);
    setActiveDropdown(null);
  };

  return (
    <>
      <div className="flex justify-between items-start bg-[#ffff] px-16 py-3 border-b-2 border-solid border-[#E9E9E9]">
        <div className="flex gap-8">
          <button
            className={`font-bold cursor-pointer text-sm dropdown-button ${activeDropdown === 'categories' ? 'border-b-2 border-black' : ''}`}
            onClick={() => handleButtonClick('categories')}
          >
            CATEGORIES
          </button>
          <button
            className={`font-bold cursor-pointer text-sm dropdown-button ${activeDropdown === 'recipients' ? 'border-b-2 border-black' : ''}`}
            onClick={() => handleButtonClick('recipients')}
          >
            RECIPIENTS
          </button>
          <button
            className={`font-bold cursor-pointer text-sm dropdown-button ${activeDropdown === 'occasions' ? 'border-b-2 border-black' : ''}`}
            onClick={() => handleButtonClick('occasions')}
          >
            OCCASIONS
          </button>
          <button
            className={`font-bold cursor-pointer text-sm dropdown-button ${activeDropdown === 'personalization' ? 'border-b-2 border-black' : ''}`}
            onClick={() => handleButtonClick('personalization')}
          >
            PERSONALIZATION METHOD
          </button>
          <button
            className={`font-bold cursor-pointer text-sm text-red-300 dropdown-button ${activeDropdown === 'birthday' ? 'border-b-2 border-black' : ''}`}
            onClick={() => handleButtonClick('birthday')}
          >
            BIRTHDAY GIFT
          </button>
        </div>
        <div>
          <span className="text-sm font-normal">Phone: </span>
          <span className="text-sm font-semibold">+92-3465987104</span>
        </div>
      </div>

      {activeDropdown === 'categories' && (
        <div className="w-[91%] p-[36px_40px] absolute bg-white shadow-xl rounded-bl-[20px] rounded-br-[20px] z-50 mt-4 left-1/2 transform -translate-x-1/2 dropdown-content flex justify-center">

          {/* Dynamic Columns */}
          <div className="grid grid-cols-5 gap-x-5 gap-y-8 w-[75%] text-sm">
            {hoverSubOptions?.categories?.map((column, index) => (
              <div key={index}>
                <h4 className="font-semibold text-[14px] text-black mb-6" onClick={() => handleTitleClick(column.url)}>{column.title}</h4>
                {column.items.map((item, idx) => (
                  <p key={idx} className="text-[16px] text-[#696C70] mt-4">{item}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Image Section */}
          <div className="w-[25%]">
            <h4 className="font-semibold mb-4">RECENT PRODUCTS</h4>
            <img src={hover1} alt="Recent" className="rounded-md w-[300px]" />
            <div className='mt-4'>
              <p>Faux Leather Leggings</p>
              <div className='flex items-center gap-2 text-sm mt-1'>
                <span>$68</span>
                <span className='line-through text-[#A0A0A0]'>$98</span>
                <span className='bg-[#D2EF9A] rounded-[24px] p-1'>-25%</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {activeDropdown === 'recipients' && (
        <div className="w-[91%] p-[36px_40px] absolute bg-white shadow-xl rounded-bl-[20px] rounded-br-[20px] z-50 mt-4 left-1/2 transform -translate-x-1/2 dropdown-content flex justify-center">

          {/* Dynamic Columns */}
          <div className="grid grid-cols-4 gap-x-5 gap-y-8 w-[75%] text-sm">
            {hoverSubOptions?.recipients?.map((column, index) => (
              <div key={index}>
                <h4 className="font-semibold text-[14px] text-black mb-6" onClick={() => handleTitleClick(column.url)}>{column.title}</h4>
                {column.items.map((item, idx) => (
                  <p key={idx} className="text-[16px] text-[#696C70] mt-4">{item}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Image Section */}
          <div className="w-[25%]">
            <h4 className="font-semibold mb-4">RECENT PRODUCTS</h4>
            <img src={hover1} alt="Recent" className="rounded-md w-[300px]" />
            <div className='mt-4'>
              <p>Faux Leather Leggings</p>
              <div className='flex items-center gap-2 text-sm mt-1'>
                <span>$68</span>
                <span className='line-through text-[#A0A0A0]'>$98</span>
                <span className='bg-[#D2EF9A] rounded-[24px] p-1'>-25%</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {activeDropdown === 'occasions' && (
        <div className="w-[91%] p-[36px_40px] absolute bg-white shadow-xl rounded-bl-[20px] rounded-br-[20px] z-50 mt-4 left-1/2 transform -translate-x-1/2 dropdown-content flex justify-center">

          {/* Dynamic Columns */}
          <div className="grid grid-cols-4 gap-x-5 gap-y-8 w-[75%] text-sm">
            {hoverSubOptions?.occasions?.map((column, index) => (
              <div key={index}>
                <h4 className="font-semibold text-[14px] text-black mb-6" onClick={() => handleTitleClick(column.url)}>{column.title}</h4>
                {column.items.map((item, idx) => (
                  <p key={idx} className="text-[16px] text-[#696C70] mt-4">{item}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Image Section */}
          <div className="w-[25%]">
            <h4 className="font-semibold mb-4">RECENT PRODUCTS</h4>
            <img src={hover1} alt="Recent" className="rounded-md w-[300px]" />
            <div className='mt-4'>
              <p>Faux Leather Leggings</p>
              <div className='flex items-center gap-2 text-sm mt-1'>
                <span>$68</span>
                <span className='line-through text-[#A0A0A0]'>$98</span>
                <span className='bg-[#D2EF9A] rounded-[24px] p-1'>-25%</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {activeDropdown === 'personalization' && (
        <div className="w-[48%] p-[36px_40px] absolute bg-white shadow-xl rounded-bl-[20px] rounded-br-[20px] z-50 mt-4 left-[125px] dropdown-content flex justify-center">

          {/* Columns */}
          <div className="grid grid-cols-3 gap-x-10 gap-y-4 w-full text-sm">
            {hoverSubOptions?.personalization?.map((column, index) => (
              <div key={index}>
                <h4 className="font-semibold text-[14px] text-black mb-6 uppercase" onClick={() => handleTitleClick(column.url)}>{column.title}</h4>
                {column.items.map((item, idx) => (
                  <p key={idx} className="text-[16px] text-[#696C70] mt-4">{item}</p>
                ))}
              </div>
            ))}
          </div>

        </div>
      )}

      {activeDropdown === 'birthday' && (
        <div className="border border-black w-[90%] p-2 absolute bg-white shadow-lg rounded-lg z-10 my-2 left-[75px] dropdown-content">
          BIRTHDAY GIFT
        </div>
      )}
    </>
  );
};

export default SubNavbar;

