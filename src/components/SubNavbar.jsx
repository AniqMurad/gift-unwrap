import React, { useState, useEffect } from 'react';
import hover1 from "../assets/hover1.png"
import hoverSubOptions from '../components/hoverSubOptions'
import { useNavigate } from 'react-router-dom';
import Product from './Product';
import ProductData from './ProductData';

const SubNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const featuredProduct = {
    ...ProductData.giftsForHim[0],
    category: 'giftsForHim'
  };

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

      {activeDropdown === 'recipients' && (
        <div className="w-[91%] p-[36px_40px] absolute bg-white shadow-xl rounded-bl-[20px] rounded-br-[20px] z-50 mt-4 left-1/2 transform -translate-x-1/2 dropdown-content flex justify-center">

          <div className="grid grid-cols-4 gap-x-5 gap-y-8 w-[75%] text-sm cursor-pointer">
          {hoverSubOptions?.recipients?.map((column, index) => (
            <div key={index}>
              <h4 className="font-semibold text-[14px] text-black mb-6" onClick={() => handleTitleClick(column.url)}>{column.title}</h4>
              {column.items.map((item, idx) => (
                typeof item === 'string' ? (
                  <p key={idx} className="text-[16px] text-[#696C70] mt-4">{item}</p>
                ) : (
                  <p 
                    key={idx} 
                    className="text-[16px] text-[#696C70] mt-4"
                    onClick={() => handleTitleClick(item.url)}
                  >
                    {item.name || item}
                  </p>
                )
              ))}
            </div>
          ))}

          </div>

          <div className="w-[25%]">
            <h4 className="font-semibold mb-4">RECENT PRODUCTS</h4>
            <Product product={featuredProduct} />
          </div>

        </div>
      )}

      {activeDropdown === 'occasions' && (
        <div className="w-[91%] p-[36px_40px] absolute bg-white shadow-xl rounded-bl-[20px] rounded-br-[20px] z-50 mt-4 left-1/2 transform -translate-x-1/2 dropdown-content flex justify-center">

          <div className="grid grid-cols-4 gap-x-5 gap-y-8 w-[75%] text-sm cursor-pointer">
            {hoverSubOptions?.occasions?.map((column, index) => (
              <div key={index}>
                <h4 className="font-semibold text-[14px] text-black mb-6" onClick={() => handleTitleClick(column.url)}>{column.title}</h4>
                {column.items.map((item, idx) => (
                  typeof item === 'string' ? (
                    <p key={idx} className="text-[16px] text-[#696C70] mt-4">
                      {item}
                    </p>
                  ) : (
                    <p
                      key={idx}
                      className="text-[16px] text-[#696C70] mt-4"
                      onClick={() => handleTitleClick(item.url)}
                    >
                      {item.name}
                    </p>
                  )
                ))}
              </div>
            ))}
          </div>

          <div className="w-[25%]">
            <h4 className="font-semibold mb-4">RECENT PRODUCTS</h4>
            <Product product={featuredProduct} />
          </div>

        </div>
      )}
    </>
  );
};

export default SubNavbar;

