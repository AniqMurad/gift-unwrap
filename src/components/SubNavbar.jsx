import React from 'react'

const SubNavbar = () => {
    return (
        <div className="flex justify-between items-start bg-[#ffff] px-16 py-3 border-b-2 border-solid border-[#E9E9E9]">
            <div className='flex gap-8'>
                <button className='font-bold text-sm border-b-2'>
                    CATEGORIES
                </button>
                <button className='font-bold text-sm'>
                    RECIPIENTS
                </button>
                <button className='font-bold text-sm'>
                    OCASSIONS
                </button>
                <button className='font-bold text-sm'>
                    PERSONALIZATION METHOD
                </button>
                <button className='font-bold text-sm text-red-300'>
                    BIRTHDAY GIFT
                </button>
            </div>
            <div>
              <span className='text-sm font-normal'>Phone: </span> <span className='text-sm font-semibold'>+92-3465987104</span>
            </div>
        </div>
    )
}

export default SubNavbar


//semi function 
// import React, { useState } from "react";

// const SubNavbar = () => {
//     const [activeTab, setActiveTab] = useState(""); 
//     const [openDropdown, setOpenDropdown] = useState(null); 

//     const tabs = ["CATEGORIES", "RECIPIENTS", "OCCASIONS", "PERSONALIZATION METHOD", "BIRTHDAY GIFT"];

//     const handleTabClick = (tab) => {
//         setActiveTab(tab);
//         setOpenDropdown(openDropdown === tab ? null : tab); // Toggle dropdown
//     };

//     return (
//         <div className="relative">
//             {/* Navbar */}
//             <div className="flex justify-between items-start bg-[#ffff] px-16 py-3 border-b-2 border-[#E9E9E9]">
//                 <div className="flex gap-8">
//                     {tabs.map((tab) => (
//                         <div key={tab} className="relative">
//                             <button
//                                 className={`font-semibold text-base transition-all duration-300 ${
//                                     activeTab === tab
//                                         ? "border-b-2 border-[#1F1F1F] text-black"
//                                         : "text-gray-500"
//                                 } ${tab === "BIRTHDAY GIFT" ? "text-red-300" : ""}`}
//                                 onClick={() => handleTabClick(tab)}
//                             >
//                                 {tab}
//                             </button>

//                             {/* Dropdown Component - Shows only if openDropdown matches the tab */}
//                             {openDropdown === tab && <DropdownContent tab={tab} />}
//                         </div>
//                     ))}
//                 </div>
//                 <div>
//                     <span className="text-sm font-normal">Phone: </span>
//                     <span className="text-sm font-semibold">+92-3465987104</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Dropdown Component - Shows different content for each tab
// const DropdownContent = ({ tab }) => {
//     const dropdownData = {
//         "CATEGORIES": ["Electronics", "Fashion", "Home & Kitchen"],
//         "RECIPIENTS": ["For Him", "For Her", "For Kids"],
//         "OCCASIONS": ["Birthday", "Anniversary", "Christmas"],
//         "PERSONALIZATION METHOD": ["Engraving", "Embroidery", "Custom Printing"],
//         "BIRTHDAY GIFT": ["Gift Cards", "Personalized Mugs", "Photo Frames"],
//     };

//     // Generate 10 items for each tab
//     const items = Array.from({ length: 10 }, (_, index) => ({
//         heading: `${dropdownData[tab][0]} ${index + 1}`,
//         subItems: ["Sub-item 1", "Sub-item 2", "Sub-item 3"],
//     }));

//     return (
//         <div className="absolute left-0 mt-2 w-96 bg-white shadow-lg rounded-lg p-3 z-20">
//             <div className="grid grid-cols-2 gap-4">
//                 {items.map((item, index) => (
//                     <div key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                         <div className="font-bold">{item.heading}</div>
//                         <ul className="list-disc pl-5">
//                             {item.subItems.map((subItem, subIndex) => (
//                                 <li key={subIndex}>{subItem}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SubNavbar;