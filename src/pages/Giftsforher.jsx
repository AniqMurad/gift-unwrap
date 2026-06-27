import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import SearchPageNavbar from "../components/SearchPageNavbar";
import Footer from "../components/Footer";
import {
  ArrowDown,
  FilterIcon,
  FiveBars,
  FourBars,
  HerCross,
  HerHorLine,
  HerLine,
  PagenextIcon,
  PageprevIcon,
  SquareIcon,
  ThreeBars,
} from "../components/icons";
import Product from "../components/Product";
import Loader from "../components/Loader";
import { Buttons } from "../components/Buttons";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PriceRangeSlider from "../components/PriceRangeSlider";
import DeliveryMarquee from "@/components/DeliveryMarquee";

const Giftsforher = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [columns, setColumns] = useState(4);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sortOrder, setSortOrder] = useState("default");
  const giftsForHerProducts = products
    .filter(
      (product) =>
        (selectedCategory === "" || product.keyGift === selectedCategory) &&
        product.price >= minPrice &&
        product.price <= maxPrice
    )
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const category = "giftsForHer";

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://giftunwrapbackend.vercel.app/api/products")
      .then((res) => {
        const categoryData = res.data.find(
          (item) => item.category === category
        );
        if (categoryData) {
          setProducts(categoryData.products);
        }
      })
      .catch((err) => console.error("Failed to load products:", err))
      .finally(() => setLoading(false));
  }, [category]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get("category");

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

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

  // Show 3 rows worth of products initially; "Load More" reveals 3 more rows at a time
  const [visibleCount, setVisibleCount] = useState(columns * 3);

  useEffect(() => {
    setVisibleCount(columns * 3);
  }, [columns, selectedCategory, minPrice, maxPrice, sortOrder]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + columns * 3);
  };

  const handleColumnChange = (col) => {
    setColumns(col);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const removeFilter = (filter) => {
    setSelectedFilters((prev) => prev.filter((f) => f !== filter));
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const clearAllFilters = () => {
    setSelectedCategory("");
    setSelectedFilters([]);
    setMinPrice(0);
    setMaxPrice(50000);
    setSortOrder("default");
  };

  // Get meta tags based on selected category
  const getMetaTags = () => {
    const metaData = {
      "": {
        title: "Gifts for Her | Elegant & Unique Gifts Gift Unwrap",
        description: "Shop the best gifts for her at Gift Unwrap. Discover elegant, unique & thoughtful presents with fast delivery in Pakistan for every special occasion."
      },
      "mum": {
        title: "Gifts for Mother | Loving & Special Gifts Unwrap",
        description: "Shop heartfelt gifts for mother at Gift Unwrap. Discover thoughtful, unique & loving presents with fast delivery in Pakistan for every moment."
      },
      "sister": {
        title: "Gifts for Sister | Cute & Trendy Surprises Unwrap",
        description: "Find the best gifts for sister at Gift Unwrap. Shop cute, stylish & meaningful presents with fast delivery in Pakistan for birthdays & more."
      },
      "girlfriend": {
        title: "Gifts for Girlfriend | Romantic Surprises Unwrap",
        description: "Discover romantic gifts for girlfriend at Gift Unwrap. Shop unique, cute & thoughtful presents with fast delivery in Pakistan for special moments."
      },
      "daughter": {
        title: "Gifts for Daughter | Sweet & Lovely Gifts Unwrap",
        description: "Explore gifts for daughter at Gift Unwrap. Shop sweet, fun & meaningful presents with fast delivery in Pakistan for birthdays & special days."
      },
      "wife": {
        title: "Gifts for Wife | Romantic & Elegant Gifts Unwrap",
        description: "Shop beautiful gifts for wife at Gift Unwrap. Discover romantic, elegant & unique presents with fast delivery in Pakistan for every occasion."
      },
      "friend": {
        title: "Gifts for Friend | Cute & Fun Ideas Gift Unwrap",
        description: "Find perfect gifts for friend at Gift Unwrap. Shop cute, fun & creative presents with fast delivery in Pakistan for birthdays & celebrations."
      }
    };
    return metaData[selectedCategory] || metaData[""];
  };

  const currentMeta = getMetaTags();

  return (
    <div>
      <Helmet>
        <title>{currentMeta.title}</title>
        <meta name="description" content={currentMeta.description} />
      </Helmet>
      {loading && <Loader />}
      <Navbar showSearchInput={false} bgColor="#FBF4E8" />
      <DeliveryMarquee />
      <SearchPageNavbar
        title="Gifts For Her"
        titleHome="Home Page"
        backgroundColor="#FBF4E8"
      />
      <div className="bg-[#FBF4E8] justify-center gap-2 sm:gap-4 lg:gap-8 flex flex-wrap text-[10px] sm:text-[12px] lg:text-[14px] font-semibold text-[#1F1F1F] uppercase py-4 sm:py-6 px-2">
        <p
          className={`cursor-pointer ${
            selectedCategory === "mum" ? "underline" : ""
          }`}
          onClick={() => handleCategorySelect("mum")}
        >
          <span className="hidden sm:inline">Gifts For Mum</span>
          <span className="sm:hidden">Mum</span>
        </p>
        <p
          className={`cursor-pointer ${
            selectedCategory === "sister" ? "underline" : ""
          }`}
          onClick={() => handleCategorySelect("sister")}
        >
          <span className="hidden sm:inline">Gifts For Sister</span>
          <span className="sm:hidden">Sister</span>
        </p>
        <p
          className={`cursor-pointer ${
            selectedCategory === "girlfriend" ? "underline" : ""
          }`}
          onClick={() => handleCategorySelect("girlfriend")}
        >
          <span className="hidden sm:inline">Gifts For Girlfriend</span>
          <span className="sm:hidden">Girlfriend</span>
        </p>
        <p
          className={`cursor-pointer ${
            selectedCategory === "daughter" ? "underline" : ""
          }`}
          onClick={() => handleCategorySelect("daughter")}
        >
          <span className="hidden sm:inline">Gifts For Daughter</span>
          <span className="sm:hidden">Daughter</span>
        </p>
        <p
          className={`cursor-pointer ${
            selectedCategory === "wife" ? "underline" : ""
          }`}
          onClick={() => handleCategorySelect("wife")}
        >
          <span className="hidden sm:inline">Gifts For Wife</span>
          <span className="sm:hidden">Wife</span>
        </p>
        <p
          className={`cursor-pointer ${
            selectedCategory === "friend" ? "underline" : ""
          }`}
          onClick={() => handleCategorySelect("friend")}
        >
          <span className="hidden sm:inline">Gifts For Friend</span>
          <span className="sm:hidden">Friend</span>
        </p>
      </div>

      <div className="px-4 sm:px-8 lg:px-16 py-6 sm:py-8 lg:py-10 flex justify-between">
        <div className="w-full transition-all duration-300">
          {/* filters */}
          <div className="flex flex-col flex-wrap gap-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 sm:space-x-6">
              {/* Layout Switch Buttons */}
              <div className="flex items-center space-x-4">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="border border-[#E9E9E9] px-3 py-1.5 rounded text-sm bg-white cursor-pointer hidden sm:block"
                >
                  <option value="default">Sort by Price</option>
                  <option value="lowToHigh">Low to High</option>
                  <option value="highToLow">High to Low</option>
                </select>
                <div className="flex space-x-2">
                  <div
                    className={`border ${
                      columns === 3 ? "bg-black" : "border-[#E9E9E9]"
                    } p-1 rounded cursor-pointer hidden sm:block`}
                    onClick={() => handleColumnChange(3)}
                  >
                    <ThreeBars
                      fillColor={columns === 3 ? "white" : "#A0A0A0"}
                    />
                  </div>
                  {screenWidth >= 1024 && (
                    <div
                      className={`border ${
                        columns === 4 ? "bg-black" : "border-[#E9E9E9]"
                      } p-1 rounded cursor-pointer hidden sm:block`}
                      onClick={() => handleColumnChange(4)}
                    >
                      <FourBars
                        fillColor={columns === 4 ? "white" : "#A0A0A0"}
                      />
                    </div>
                  )}
                  {screenWidth >= 1280 && (
                    <div
                      className={`border ${
                        columns === 5 ? "bg-black" : "border-[#E9E9E9]"
                      } p-1 rounded cursor-pointer hidden sm:block`}
                      onClick={() => handleColumnChange(5)}
                    >
                      <FiveBars
                        fillColor={columns === 5 ? "white" : "#A0A0A0"}
                      />
                    </div>
                  )}
                </div>
              </div>
              <PriceRangeSlider
                minVal={minPrice}
                maxVal={maxPrice}
                onMinChange={setMinPrice}
                onMaxChange={setMaxPrice}
              />
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 items-center mt-2">
              {/* <span className="text-[#696C70] font-medium text-xs sm:text-sm">
                {selectedFilters.length > 0 || selectedCategory
                  ? "18 Products Found:"
                  : ""}
              </span>

              <div className="flex flex-wrap gap-1 sm:gap-2">
                
                {selectedCategory && (
                  <span className="px-2 sm:px-3 py-1 bg-[#F9F1F0] text-black rounded-full flex items-center text-xs sm:text-sm">
                    <button
                      onClick={() => setSelectedCategory("")}
                      className="mr-1 sm:mr-2 text-gray-500 hover:text-black"
                    >
                      <HerCross strokeColor="#1F1F1F" />
                    </button>
                    {selectedCategory}
                  </span>
                )}

                {(minPrice > 0 || maxPrice < 1000) && (
                  <span className="px-2 sm:px-3 py-1 bg-[#D2EF9A] text-[#1F1F1F] rounded-full flex items-center text-xs sm:text-sm">
                    <button
                      onClick={() => {
                        setMinPrice(0);
                        setMaxPrice(1000);
                      }}
                      className="mr-1 sm:mr-2 text-green-800 hover:text-green-900"
                    >
                      <HerHorLine />
                    </button>
                    PKR {minPrice} - PKR {maxPrice}
                  </span>
                )}

                {selectedFilters.map((filter) => (
                  <span
                    key={filter}
                    className="px-2 sm:px-3 py-1 bg-[#F9F1F0] text-black rounded-full flex items-center text-xs sm:text-sm"
                  >
                    <button
                      onClick={() => removeFilter(filter)}
                      className="mr-1 sm:mr-2 text-gray-500 hover:text-black"
                    >
                      <HerCross strokeColor="#1F1F1F" />
                    </button>
                    {filter}
                  </span>
                ))}
              </div> */}

              {/* Clear All Button */}
              {(selectedFilters.length > 0 ||
                selectedCategory ||
                minPrice > 0 ||
                maxPrice < 1000) && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1 sm:gap-2 border border-[#DB4444] px-2 sm:px-3 py-1 text-[#DB4444] bg-[#F9F1F0] rounded-full text-xs sm:text-sm"
                >
                  <HerCross strokeColor="#DB4444" />
                  <span className="hidden sm:inline">Clear All</span>
                  <span className="sm:hidden">Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* products */}
          {giftsForHerProducts.length > 0 ? (
            <div
              className={`justify-items-center grid gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-8 lg:mt-10 transition-all duration-300
                grid-cols-2 sm:grid-cols-3
                ${columns === 3 ? "lg:grid-cols-3" : ""}
                ${columns === 4 ? "lg:grid-cols-4" : ""}
                ${columns === 5 ? "lg:grid-cols-5" : ""}
                `}
            >
              {giftsForHerProducts.slice(0, visibleCount).map((product) => (
                <Product
                  key={product.id}
                  product={{ ...product, category: "giftsForHer" }}
                  columns={columns}
                />
              ))}
            </div>
          ) : null}
          {giftsForHerProducts.length > visibleCount && (
            <div className="flex justify-center mt-8 sm:mt-10">
              <Buttons onClick={handleLoadMore} />
            </div>
          )}
          {giftsForHerProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 lg:py-24">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-600 mb-4">
                  No Products Available
                </h3>
                <p className="text-sm sm:text-base text-gray-500">
                  Sorry, there are no products available in this category at the
                  moment.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Giftsforher;
