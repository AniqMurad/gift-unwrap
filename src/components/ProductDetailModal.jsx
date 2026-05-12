import React, { useState } from "react";
import { CloseIcon } from "./icons";

const ProductDetailModal = ({ 
  isOpen, 
  onClose, 
  item, 
  itemType,
  onSelect,
  onAddItem,
  quantity = 1,
  setQuantity
}) => {
  const [selectedImage, setSelectedImage] = useState(item?.image || item?.images?.[0] || "");

  if (!isOpen || !item) return null;

  const images = item.images || [item.image];
  
  const handleIncreaseQuantity = () => {
    if (setQuantity) setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (setQuantity && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const getItemTypeLabel = () => {
    if (itemType === "box") return "Gift Box";
    if (itemType === "card") return "Gift Card";
    return "Gift Item";
  };

  const getItemTypeBadgeColor = () => {
    if (itemType === "box") return "bg-blue-600";
    if (itemType === "card") return "bg-purple-600";
    return "bg-green-600";
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            {/* Left: Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-center relative aspect-square">
                <img
                  src={selectedImage || images[0]}
                  alt={item.name}
                  className="w-full h-full object-contain max-h-[400px]"
                  style={item.color ? { backgroundColor: item.color } : {}}
                />
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((imgSrc, index) => (
                    <div
                      key={index}
                      className={`border-2 p-2 rounded cursor-pointer aspect-square ${
                        selectedImage === imgSrc || (!selectedImage && index === 0)
                          ? "border-black"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedImage(imgSrc)}
                    >
                      <img
                        src={imgSrc}
                        alt={`${item.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info */}
            <div className="space-y-4">
              {/* Item Type Badge */}
              <div className="flex items-center gap-2">
                <span className={`text-xs ${getItemTypeBadgeColor()} text-white px-3 py-1 rounded-full font-semibold`}>
                  {getItemTypeLabel()}
                </span>
              </div>

              {/* Product Name */}
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {item.name}
              </h2>

              {/* Price */}
              <div className="flex items-center gap-4 border-b pb-4">
                <span className="text-2xl sm:text-3xl font-bold text-red-500">
                  {itemType === "card" ? "Free" : `PKR ${Math.floor(item.price)}`}
                </span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-lg text-gray-400 line-through">
                    PKR {Math.floor(item.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              {item.description && (
                <div className="border-b pb-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )}

              {/* Size/Design Info */}
              <div className="space-y-2 text-sm">
                {item.size && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Size:</span>
                    <span className="text-gray-600">{item.size}</span>
                  </div>
                )}
                {item.design && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Design:</span>
                    <span className="text-gray-600">{item.design}</span>
                  </div>
                )}
                {item.category && itemType === "giftItem" && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Category:</span>
                    <span className="text-gray-600 capitalize">{item.category}</span>
                  </div>
                )}
                {item.color && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Color:</span>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-600 capitalize">{item.color}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Selector (only for gift items) */}
              {itemType === "giftItem" && setQuantity && (
                <div className="border-t pt-4">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-700">Quantity:</span>
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={handleDecreaseQuantity}
                        className="px-4 py-2 hover:bg-gray-100 transition-colors text-lg font-semibold"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-6 py-2 border-x font-semibold">{quantity}</span>
                      <button
                        onClick={handleIncreaseQuantity}
                        className="px-4 py-2 hover:bg-gray-100 transition-colors text-lg font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                {itemType === "box" || itemType === "card" ? (
                  <button
                    onClick={onSelect}
                    className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-lg"
                  >
                    Select {itemType === "box" ? "Box" : "Card"}
                  </button>
                ) : (
                  <button
                    onClick={onAddItem}
                    className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-lg"
                  >
                    Add to Gift Box
                  </button>
                )}
                
                <button
                  onClick={onClose}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Additional Info */}
              {itemType === "card" && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-sm">
                  <p className="text-purple-800">
                    <strong>Note:</strong> You can add a personalized message in the next step.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
