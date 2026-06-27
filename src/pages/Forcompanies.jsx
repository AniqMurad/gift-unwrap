import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import SearchPageNavbar from "../components/SearchPageNavbar";
import Footer from "../components/Footer";
import {
  ArrowDown,
  FiveBars,
  FourBars,
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

const Forcompanies = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [columns, setColumns] = useState(4); // Default to 4 columns
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [selectedCategory, setSelectedCategory] = useState(""); // Tracks selected gift category
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sortOrder, setSortOrder] = useState("default");
  const giftsForCompanyProducts = products
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

  const category = "giftsForCompany";

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
        title: "Corporate Gifts for Companies | Gift Unwrap Pakistan",
        description: "Explore corporate gifts for companies at Gift Unwrap. Discover unique, professional & customized gift solutions with fast delivery in Pakistan."
      },
      "newhire": {
        title: "Gifts for New Hire | Corporate Gifts Unwrap",
        description: "Welcome employees with gifts for new hire from Gift Unwrap. Shop professional, thoughtful & unique corporate gifts with delivery in Pakistan."
      },
      "ocassion": {
        title: "Corporate Gift Occasions | Unique Gifts Unwrap",
        description: "Explore corporate gift occasions at Gift Unwrap. Find unique, professional & customized gifts with fast delivery in Pakistan for events."
      },
      "farewell": {
        title: "Farewell Gifts | Memorable Gifts Gift Unwrap",
        description: "Shop farewell gifts at Gift Unwrap. Find meaningful, memorable & unique presents with fast delivery in Pakistan for goodbyes & send-offs."
      },
      "achievement": {
        title: "Achievement Gifts | Reward & Celebrate Unwrap",
        description: "Celebrate success with achievement gifts from Gift Unwrap. Shop unique, premium & thoughtful presents with fast delivery in Pakistan."
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
        title="Gifts For Companies"
        titleHome="Home Page"
        backgroundColor="#FBF4E8"
      />
      <div className="bg-[#FBF4E8] justify-center gap-2 sm:gap-4 lg:gap-8 flex flex-wrap text-xs sm:text-sm lg:text-[14px] font-semibold text-[#1F1F1F] uppercase py-4 sm:py-6 px-2 sm:px-4">
        <p
          className={`cursor-pointer ${
            selectedCategory === "newhire" ? "underline" : ""
          }`}
          onClick={() => handleCategorySelect("newhire")}
        >
          <span className="sm:hidden">New Hire</span>
          <span className="hidden sm:inline">Gifts For New Hire</span>
        </p>
        <p
          className={`cursor-pointer ${
            selectedCategory === "ocassion" ? "underline" : ""
          }`}
          onClick={() => handleCategorySelect("ocassion")}
        >
          <span className="sm:hidden">Occasions</span>
          <span className="hidden sm:inline">Gifts For Occasions</span>
        </p>
        <p
          className={`cursor-pointer ${
            selectedCategory === "farewell" ? "underline" : ""
          }`}
          onClick={() => handleCategorySelect("farewell")}
        >
          <span className="sm:hidden">Farewell</span>
          <span className="hidden sm:inline">Gifts For Farewell</span>
        </p>
        <p
          className={`cursor-pointer ${
            selectedCategory === "achievement" ? "underline" : ""
          }`}
          onClick={() => handleCategorySelect("achievement")}
        >
          <span className="sm:hidden">Achievement</span>
          <span className="hidden sm:inline">Gifts for Achievement</span>
        </p>
        <p
          className={`cursor-pointer ${
            selectedCategory === "workanniversary" ? "underline" : ""
          }`}
          onClick={() => handleCategorySelect("workanniversary")}
        >
          <span className="sm:hidden">Anniversary</span>
          <span className="hidden sm:inline">Work Anniversary Gifts</span>
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
              </span> */}

              {/* <div className="flex flex-wrap gap-1 sm:gap-2">
                
                {selectedCategory && (
                  <span className="px-2 sm:px-3 py-1 bg-[#F9F1F0] text-black rounded-full flex items-center text-xs sm:text-sm">
                    <button
                      onClick={() => setSelectedCategory("")}
                      className="mr-1 sm:mr-2 text-gray-500 hover:text-black"
                    >
                      X
                    </button>
                    <span className="sm:hidden">
                      {selectedCategory === "newhire"
                        ? "New Hire"
                        : selectedCategory === "ocassion"
                        ? "Occasions"
                        : selectedCategory === "farewell"
                        ? "Farewell"
                        : selectedCategory === "achievement"
                        ? "Achievement"
                        : selectedCategory === "workanniversary"
                        ? "Anniversary"
                        : selectedCategory}
                    </span>
                    <span className="hidden sm:inline">{selectedCategory}</span>
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
                      -
                    </button>
                    <span className="sm:hidden">
                      ₨{minPrice}-{maxPrice}
                    </span>
                    <span className="hidden sm:inline">
                      PKR {minPrice} - PKR {maxPrice}
                    </span>
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
                      X
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
                  <span className="sm:hidden">Clear</span>
                  <span className="hidden sm:inline">X Clear All</span>
                </button>
              )}
            </div>
          </div>

          {/* products */}
          {giftsForCompanyProducts.length > 0 ? (
            <div
              className={`justify-items-center grid gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-8 lg:mt-10 transition-all duration-300
                grid-cols-2 sm:grid-cols-3
                ${columns === 3 ? "lg:grid-cols-3" : ""}
                ${columns === 4 ? "lg:grid-cols-4" : ""}
                ${columns === 5 ? "lg:grid-cols-5" : ""}
                `}
            >
              {giftsForCompanyProducts.slice(0, visibleCount).map((product) => (
                <Product
                  key={product.id}
                  product={{ ...product, category: "giftsForCompany" }}
                  columns={columns}
                />
              ))}
            </div>
          ) : null}
          {giftsForCompanyProducts.length > visibleCount && (
            <div className="flex justify-center mt-8 sm:mt-10">
              <Buttons onClick={handleLoadMore} />
            </div>
          )}
          {giftsForCompanyProducts.length === 0 && (
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

export default Forcompanies;
