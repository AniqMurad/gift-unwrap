import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Product from "./Product";
import axios from "axios";
import hoverSubOptions from "../components/hoverSubOptions";

const SubNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedProduct = async () => {
      try {
        const response = await axios.get("https://giftunwrapbackend.vercel.app/api/products");
        console.log("SubNavbar API response (raw):", response.data);

        if (response.data && response.data.length > 0) {
          const giftsForEveryoneCategory = response.data.find(
            (item) => item.category === "giftsForEveryone"
          );

          if (
            giftsForEveryoneCategory &&
            giftsForEveryoneCategory.products &&
            giftsForEveryoneCategory.products.length > 0
          ) {
            const productToFeature = giftsForEveryoneCategory.products[1];

            setFeaturedProduct({
              ...productToFeature,
              category: "giftsForEveryone",
            });
            console.log("SubNavbar: Featured product set:", productToFeature);
          } else {
            console.warn(
              "SubNavbar: 'giftsForEveryone' category or its products not found in response."
            );
            setFeaturedProduct(null);
          }
        } else {
          console.warn("SubNavbar: API response data is empty or invalid.");
          setFeaturedProduct(null);
        }
      } catch (error) {
        console.error("SubNavbar: Error fetching featured product:", error);
        setFeaturedProduct(null);
      }
    };

    fetchFeaturedProduct();
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleButtonClick = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleClickOutside = (event) => {
    const target = event.target;

    // Ignore programmatic or carousel-triggered clicks
    if (
      target.closest('[data-ignore-dropdown-close="true"]') ||
      target.closest(".dropdown-button") ||
      target.closest(".dropdown-content")
    ) {
      return;
    }

    setActiveDropdown(null);
  };

  const handleTitleClick = (url) => {
    navigate(url);
    setActiveDropdown(null);
  };
  const navigateToFlowers = () => {
    navigate("flower-chocolate");
  };

  return (
    <>
      <div className="flex justify-between items-start bg-[#ffff] px-4 sm:px-8 lg:px-16 py-3 border-b-2 border-solid border-[#E9E9E9]">
        <div className="flex gap-4 sm:gap-8 flex-wrap">
          <button
            className={`font-bold cursor-pointer text-xs sm:text-sm dropdown-button ${activeDropdown === "recipients" ? "border-b-2 border-black" : ""
              }`}
            onClick={() => handleButtonClick("recipients")}
          >
            RECIPIENTS
          </button>
          <button
            className={`font-bold cursor-pointer text-xs sm:text-sm dropdown-button ${activeDropdown === "occasions" ? "border-b-2 border-black" : ""
              }`}
            onClick={() => handleButtonClick("occasions")}
          >
            OCCASIONS
          </button>
          <button
            className={`font-bold cursor-pointer text-xs sm:text-sm text-red-300 dropdown-button ${activeDropdown === "birthday" ? "border-b-2 border-black" : ""
              }`}
            onClick={navigateToFlowers}
          >
            <span className="hidden sm:inline">FLOWERS & CHOCOLATES BOUQUET</span>
            <span className="sm:hidden">FLOWERS & CHOCOLATES</span>
          </button>
        </div>
      </div>

      {activeDropdown === "recipients" && (
        <div className="w-[95%] sm:w-[91%] p-[20px] sm:p-[36px_40px] absolute bg-white shadow-xl rounded-bl-[20px] rounded-br-[20px] z-50 mt-4 left-1/2 transform -translate-x-1/2 dropdown-content flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 sm:gap-x-5 gap-y-4 sm:gap-y-8 w-full sm:w-[75%] text-sm cursor-pointer">
            {hoverSubOptions?.recipients?.map((column, index) => (
              <div key={index}>
                <h4
                  className="font-semibold text-[12px] sm:text-[14px] text-black mb-3 sm:mb-6"
                  onClick={() => handleTitleClick(column.url)}
                >
                  {column.title}
                </h4>
                <div className="sm:block">
                  {column.items.map((item, idx) =>
                    typeof item === "string" ? (
                      <p
                        key={idx}
                        className="text-[14px] sm:text-[16px] text-[#696C70] mt-2 sm:mt-4 hidden sm:block"
                      >
                        {item}
                      </p>
                    ) : (
                      <p
                        key={idx}
                        className="text-[14px] sm:text-[16px] text-[#696C70] mt-2 sm:mt-4 hidden sm:block"
                        onClick={() => handleTitleClick(item.url)}
                      >
                        {item.name || item}
                      </p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="w-[25%] hidden sm:block">
            <h4 className="font-semibold mb-4">RECENT PRODUCTS</h4>
            {featuredProduct ? (
              <Product product={featuredProduct} />
            ) : (
              <p>Loading featured product...</p>
            )}
          </div>
        </div>
      )}

      {activeDropdown === "occasions" && (
        <div className="w-[95%] sm:w-[91%] p-[20px] sm:p-[36px_40px] absolute bg-white shadow-xl rounded-bl-[20px] rounded-br-[20px] z-50 mt-4 left-1/2 transform -translate-x-1/2 dropdown-content flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 sm:gap-x-5 gap-y-4 sm:gap-y-8 w-full sm:w-[75%] text-sm cursor-pointer">
            {hoverSubOptions?.occasions?.map((column, index) => (
              <div key={index}>
                <h4
                  className="font-semibold text-[12px] sm:text-[14px] text-black mb-3 sm:mb-6"
                  onClick={() => handleTitleClick(column.url)}
                >
                  {column.title}
                </h4>
                <div className="sm:block">
                  {column.items.map((item, idx) =>
                    typeof item === "string" ? (
                      <p
                        key={idx}
                        className="text-[14px] sm:text-[16px] text-[#696C70] mt-2 sm:mt-4 hidden sm:block"
                      >
                        {item}
                      </p>
                    ) : (
                      <p
                        key={idx}
                        className="text-[14px] sm:text-[16px] text-[#696C70] mt-2 sm:mt-4 hidden sm:block"
                        onClick={() => handleTitleClick(item.url)}
                      >
                        {item.name}
                      </p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="w-[25%] hidden sm:block">
            <h4 className="font-semibold mb-4">RECENT PRODUCTS</h4>
            {featuredProduct ? (
              <Product product={featuredProduct} />
            ) : (
              <p>Loading featured product...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SubNavbar;
