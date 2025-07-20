import React from "react";

const OrderSummary = ({
  cartItems,
  subtotal,
  shippingCost,
  discountAmount,
  totalOrderAmount,
  showDiscountApplied,
  title = "Order Summary", // Default title
}) => {
  return (
    <>
      {showDiscountApplied && (
        <div className="flex justify-end mb-4">
          {/* <p className="bg-[#D2EF9A] py-[12px] px-[16px] rounded-[8px] text-black text-[14px] font-medium">
            Discount code has been applied!
          </p> */}
        </div>
      )}
      <div className="bg-[#F7F7F7] p-5 md:p-6 rounded-xl">
        <h2 className="text-[24px] md:text-[30px] font-semibold mb-6">
          {title}
        </h2>
        {cartItems && cartItems.length > 0 ? (
          <div className="space-y-4 max-h-80 overflow-y-auto mb-6 pr-2">
            {" "}
            {/* Consider if max-h is always needed */}
            {cartItems.map((item) => (
              <div
                key={
                  item.id
                    ? `${item.category}-${item.id}`
                    : `${item.name}-${item.price}`
                }
                className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0"
              >
                <img
                  src={
                    item.image ||
                    (item.images && item.images[0]) ||
                    "https://via.placeholder.com/80"
                  }
                  alt={item.name}
                  className="w-16 h-20 object-cover rounded-[8px] bg-gray-200"
                />
                <div className="flex-1">
                  <p className="font-medium text-[15px] leading-tight">
                    {item.name}
                  </p>
                  <p className="text-[#696C70] text-[13px]">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-[15px]">
                  PKR {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-5">
            No items in this order.
          </p>
        )}

        <div className="space-y-3 border-t pt-6">
          <div className="flex justify-between text-[16px]">
            <p>Subtotal</p>
            <p className="font-medium">
              PKR {subtotal ? Math.floor(subtotal) : "0"}
            </p>
          </div>
          <div className="flex justify-between text-[16px]">
            <p>Shipping</p>
            <p className="font-medium">
              {shippingCost === 0
                ? "Free"
                : `PKR ${shippingCost ? Math.floor(shippingCost) : "0"}`}
            </p>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-[16px] text-green-600">
              <p>Discounts</p>
              <p className="font-medium">- PKR {Math.floor(discountAmount)}</p>
            </div>
          )}
          <div className="flex justify-between text-[20px] font-bold pt-3 border-t mt-3">
            <p>Total</p>
            <p>PKR {totalOrderAmount ? Math.floor(totalOrderAmount) : "0"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
