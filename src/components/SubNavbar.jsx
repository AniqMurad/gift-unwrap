import React, { useState, useEffect } from 'react';

const SubNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

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

  return (
    <>
      <div className="flex justify-between items-start bg-[#ffff] px-16 py-3 border-b-2 border-solid border-[#E9E9E9]">
        <div className="flex gap-8">
          <button
            className={`font-bold text-sm dropdown-button ${activeDropdown === 'categories' ? 'border-b-2 border-black' : ''}`}
            onClick={() => handleButtonClick('categories')}
          >
            CATEGORIES
          </button>
          <button
            className={`font-bold text-sm dropdown-button ${activeDropdown === 'recipients' ? 'border-b-2 border-black' : ''}`}
            onClick={() => handleButtonClick('recipients')}
          >
            RECIPIENTS
          </button>
          <button
            className={`font-bold text-sm dropdown-button ${activeDropdown === 'occasions' ? 'border-b-2 border-black' : ''}`}
            onClick={() => handleButtonClick('occasions')}
          >
            OCCASIONS
          </button>
          <button
            className={`font-bold text-sm dropdown-button ${activeDropdown === 'personalization' ? 'border-b-2 border-black' : ''}`}
            onClick={() => handleButtonClick('personalization')}
          >
            PERSONALIZATION METHOD
          </button>
          <button
            className={`font-bold text-sm text-red-300 dropdown-button ${activeDropdown === 'birthday' ? 'border-b-2 border-black' : ''}`}
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
        <div className="border border-black w-[90%] p-2 absolute bg-white shadow-lg rounded-lg z-10 my-2 left-[75px] dropdown-content">
          CATEGORIES
        </div>
      )}
      {activeDropdown === 'recipients' && (
        <div className="border border-black w-[90%] p-2 absolute bg-white shadow-lg rounded-lg z-10 my-2 left-[75px] dropdown-content">
          RECIPIENTS
        </div>
      )}
      {activeDropdown === 'occasions' && (
        <div className="border border-black w-[90%] p-2 absolute bg-white shadow-lg rounded-lg z-10 my-2 left-[75px] dropdown-content">
          OCCASIONS
        </div>
      )}
      {activeDropdown === 'personalization' && (
        <div className="border border-black w-[90%] p-2 absolute bg-white shadow-lg rounded-lg z-10 my-2 left-[75px] dropdown-content">
          PERSONALIZATION METHOD
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

