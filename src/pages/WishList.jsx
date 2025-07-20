import React, { useState, useEffect } from "react";
import SearchPageNavbar from "../components/SearchPageNavbar";
import Product from "../components/Product";
import Footer from "../components/Footer";
import { useWishlist } from "../context/WishlistContext";
import { Buttons } from "../components/Buttons";
import { ArrowDown, FiveBars, FourBars, ThreeBars } from "../components/icons";
import Navbar from "@/components/Navbar";

const WishList = () => {
  const { wishlist } = useWishlist();
  const [columns, setColumns] = useState(4); // Default 4 columns
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const handleColumnChange = (col) => {
    setColumns(col);
  };

  // Track screen width and auto-adjust layout
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (columns === 5 && screenWidth < 1280) setColumns(4);
    if (columns === 4 && screenWidth < 1024) setColumns(3);
  }, [screenWidth, columns]);

  return (
    <div className="w-full h-auto">
      <Navbar showSearchInput={false} bgColor="#FBF4E8" />
      <SearchPageNavbar
        title="Wish List"
        titleHome="Home Page"
        backgroundColor="#FBF4E8"
      />

      <div className="px-16 py-4 mt-10 mb-10">
        <div className="flex items-center justify-between py-4 space-x-6">
          <div className="flex space-x-2">
            <div
              className={`border ${
                columns === 3 ? "bg-black" : "border-[#E9E9E9]"
              } p-1 rounded cursor-pointer hidden sm:block`}
              onClick={() => handleColumnChange(3)}
            >
              <ThreeBars fillColor={columns === 3 ? "white" : "#A0A0A0"} />
            </div>
            {screenWidth >= 1024 && (
              <div
                className={`border ${
                  columns === 4 ? "bg-black" : "border-[#E9E9E9]"
                } p-1 rounded cursor-pointer hidden sm:block`}
                onClick={() => handleColumnChange(4)}
              >
                <FourBars fillColor={columns === 4 ? "white" : "#A0A0A0"} />
              </div>
            )}
            {screenWidth >= 1280 && (
              <div
                className={`border ${
                  columns === 5 ? "bg-black" : "border-[#E9E9E9]"
                } p-1 rounded cursor-pointer hidden sm:block`}
                onClick={() => handleColumnChange(5)}
              >
                <FiveBars fillColor={columns === 5 ? "white" : "#A0A0A0"} />
              </div>
            )}
          </div>
        </div>

        <div className="">
          {wishlist.length === 0 ? (
            <p className="text-center mt-6 text-4xl font-bold">
              No items in wishlist
            </p>
          ) : (
            <div
              className={`justify-items-center grid gap-6 mt-6
                grid-cols-2 sm:grid-cols-3
                ${columns === 3 ? "lg:grid-cols-3" : ""}
                ${columns === 4 ? "lg:grid-cols-4" : ""}
                ${columns === 5 ? "lg:grid-cols-5" : ""}
            `}
            >
              {wishlist.map((item) => (
                <div
                  key={item.identifier}
                  className={`${
                    columns === 5 ? "scale-90" : "scale-100"
                  } transition-transform`}
                >
                  <Product product={item} columns={columns} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* <div className="flex justify-center mt-6 mb-6">
          <Buttons />
        </div> */}
      </div>

      <Footer />
    </div>
  );
};

export default WishList;
