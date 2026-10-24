import React, { useCallback, useState, useEffect } from "react";
import { StorefrontTitle as SearchPageNavbar } from "../components/storefront/StorefrontPage";
import Product from "../components/Product";
import { StorefrontFooter as Footer } from "../components/storefront/StorefrontPage";
import { Buttons } from "../components/Buttons";
import { StorefrontHeader as Navbar } from "../components/storefront/StorefrontPage";
import { StorefrontLoading as Loader } from "../components/storefront/StorefrontPage";
import { useSearchParams } from "react-router-dom";

const recipientLabels = {
  him: "Him",
  her: "Her",
  friend: "Friend",
  family: "Family",
};

const occasionLabels = {
  birthday: "Birthday",
  anniversary: "Anniversary",
  congratulations: "Congratulations",
  "just-because": "Just because",
};

const familyProfiles = new Set([
  "father",
  "mother",
  "mum",
  "brother",
  "sister",
  "son",
  "daughter",
  "husband",
  "wife",
  "family",
]);

const normalize = (value = "") =>
  String(value).trim().toLocaleLowerCase().replace(/[-_]+/g, " ");

const searchableProductText = (product) =>
  [
    product.name,
    product.keyGift,
    product.subcategory,
    product.shortDescription,
    product.longDescription,
    product.metaTitle,
    product.metaDescription,
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase();

const matchesRecipient = (product, recipient) => {
  if (!recipient) return true;
  const category = normalize(product.category).replaceAll(" ", "");
  const profile = normalize(product.keyGift);
  const text = searchableProductText(product);

  if (recipient === "him") return category === "giftsforhim";
  if (recipient === "her") return category === "giftsforher";
  if (recipient === "friend") {
    return profile === "friend" || category === "giftsforeveryone" || text.includes("friend");
  }
  if (recipient === "family") {
    return familyProfiles.has(profile) || category === "giftsforeveryone" || /\bfamil(?:y|ies)\b/.test(text);
  }
  return true;
};

const matchesOccasion = (product, occasion) => {
  if (!occasion) return true;
  const text = searchableProductText(product);
  const terms = {
    birthday: ["birthday"],
    anniversary: ["anniversary"],
    congratulations: ["congratulation", "celebration"],
    "just-because": ["just because", "thinking of you"],
  }[occasion] || [normalize(occasion)];
  return terms.some((term) => text.includes(term));
};

const filterProducts = (products, { query, recipient, occasion, minimumPrice, maximumPrice }) => {
  const normalizedQuery = normalize(query);
  const recipientAndBudgetMatches = products.filter((product) => {
    const price = Number(product.price);
    return (
      (!normalizedQuery || normalize(product.name).includes(normalizedQuery)) &&
      matchesRecipient(product, recipient) &&
      (!Number.isFinite(minimumPrice) || (Number.isFinite(price) && price >= minimumPrice)) &&
      (!Number.isFinite(maximumPrice) || (Number.isFinite(price) && price <= maximumPrice))
    );
  });

  if (!occasion) return recipientAndBudgetMatches;
  const occasionMatches = recipientAndBudgetMatches.filter((product) =>
    matchesOccasion(product, occasion),
  );
  return occasionMatches.length ? occasionMatches : recipientAndBudgetMatches;
};

const SearchOutput = () => {
  const [searchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const recipient = searchParams.get("recipient") || "";
  const occasion = searchParams.get("occasion") || "";
  const requestedMinimum = Number(searchParams.get("minPrice"));
  const requestedMaximum = Number(searchParams.get("maxPrice"));
  const minimumPrice = searchParams.has("minPrice") && Number.isFinite(requestedMinimum) ? requestedMinimum : Number.NaN;
  const maximumPrice = searchParams.has("maxPrice") && Number.isFinite(requestedMaximum) ? requestedMaximum : Number.NaN;
  const hasFinderFilters = Boolean(recipient || occasion || Number.isFinite(minimumPrice) || Number.isFinite(maximumPrice));

  const applyFilters = useCallback((products, queryValue) =>
    filterProducts(products, {
      query: queryValue,
      recipient,
      occasion,
      minimumPrice,
      maximumPrice,
    }), [maximumPrice, minimumPrice, occasion, recipient]);

  useEffect(() => {
    const query = searchParams.get("query") || "";
    setSearchQuery(query);

    if (allProducts.length === 0) {
      setLoading(true);
      fetch("https://giftunwrapbackend.vercel.app/api/products/")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch products");
          return res.json();
        })
        .then((data) => {
          // Flatten with category attached
          const allProductsFlat = data.flatMap((category) =>
            category.products.map((product) => ({
              ...product,
              category: category.category, // Attach category
            }))
          );

          setAllProducts(allProductsFlat);
          setFilteredProducts(applyFilters(allProductsFlat, query));
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setFilteredProducts(applyFilters(allProducts, query));
    }
  }, [searchParams, allProducts, applyFilters]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    setFilteredProducts(applyFilters(allProducts, query));
  };

  const finderDescription = [
    recipientLabels[recipient],
    occasionLabels[occasion],
    Number.isFinite(minimumPrice) || Number.isFinite(maximumPrice)
      ? `${Number.isFinite(minimumPrice) ? `${minimumPrice.toLocaleString()} PKR` : "Any"}–${Number.isFinite(maximumPrice) ? `${maximumPrice.toLocaleString()} PKR` : "No maximum"}`
      : "",
  ].filter(Boolean).join(" · ");

  if (loading) {
    return <><Navbar /><SearchPageNavbar title="Search Result" titleHome="Home Page" /><Loader /><Footer /></>;
  }

  if (error) {
    return (
      <div>
        <Navbar showSearchInput={false} bgColor="#FBF4E8" />
        <SearchPageNavbar
          title="Search Result"
          titleHome="Home Page"
          backgroundColor="#FBF4E8"
        />
        <div className="gu-migration-content gu-migration-state" role="alert">
          <p className="text-sm sm:text-base">Error: {error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full h-auto">
      <Navbar showSearchInput={false} bgColor="#FBF4E8" />
      <SearchPageNavbar
        title="Search Result"
        titleHome="Home Page"
        backgroundColor="#FBF4E8"
      />

      {/* Search Results Header */}
      <div className="gu-migration-content gu-migration-search text-center py-4 sm:py-6 lg:py-8 px-4">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
          {searchQuery.trim()
            ? `Found ${filteredProducts.length} result${
                filteredProducts.length !== 1 ? "s" : ""
              } for "${searchQuery.trim()}"`
            : hasFinderFilters
              ? `Found ${filteredProducts.length} matching gift${filteredProducts.length !== 1 ? "s" : ""}`
            : `Showing all products (${filteredProducts.length})`}
        </h2>
        {hasFinderFilters && finderDescription && (
          <p className="mb-4 text-sm sm:text-base text-gray-600">{finderDescription}</p>
        )}

        {/* Responsive Search Input */}
        <div className="flex items-center justify-center gap-0 text-sm text-gray-600">
          <input aria-label="What are you looking for today?"
            className="rounded-l-md text-[#A0A0A0] w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] border border-[#E9E9E9] py-2 px-3 sm:px-4 text-sm sm:text-base outline-none focus:border-gray-400"
            placeholder="What are you looking for today?"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          />
        </div>
      </div>

      {/* Products Grid Container */}
      <div className="gu-migration-section gu-migration-content gu-migration-catalog px-4 sm:px-8 lg:px-16 py-4 mb-6 sm:mb-8 lg:mb-10">
        {filteredProducts.length > 0 ? (
          <>
            {/* Section Title */}
            <h2 className="font-bold text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              Product Search: {searchQuery.trim() || finderDescription || "All Products"}
            </h2>

            {/* Responsive Products Grid */}
            <div className="gu-migration-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {filteredProducts.map((product, index) => (
                <Product variant="collection"
                  key={`${product.id}-${index}`}
                  product={product}
                  columns="responsive" // Pass responsive prop to Product component
                />
              ))}
            </div>
          </>
        ) : (
          /* No Results Message */
          <div className="gu-migration-state" role="status">
            <p className="text-sm sm:text-base lg:text-lg">
              {hasFinderFilters
                ? "No gifts matched your selected recipient, occasion, and budget."
                : `No results found for "${searchQuery.trim()}".`}
            </p>
            <p className="text-xs sm:text-sm lg:text-base mt-2 text-gray-500">
              {hasFinderFilters
                ? "Try widening your budget or choosing a different occasion."
                : "Please try a different search term."}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchOutput;
