const DeliveryMarquee = ({ bgColor, textColor, borderColor }) => {
  const defaultBgClass = "bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50";
  const defaultTextColor = "text-amber-900";
  const defaultBorderColor = "border-amber-200";

  return (
    <></>
    // <div 
    //   className={`${bgColor ? '' : defaultBgClass} border ${borderColor || defaultBorderColor} py-1 overflow-hidden`}
    //   style={bgColor ? { backgroundColor: bgColor } : {}}
    // >
    //   <div className="flex animate-marquee whitespace-nowrap">
    //     <span className={`mx-8 ${textColor || defaultTextColor} font-medium text-sm md:text-base flex items-center gap-2`}>
    //       FREE SHIPPING ON ORDERS ABOVE PKR 10,000
    //     </span>
    //     <span className={`mx-8 ${textColor || defaultTextColor} font-medium text-sm md:text-base flex items-center gap-2`}>
    //       FREE SHIPPING ON ORDERS ABOVE PKR 10,000
    //     </span>
    //     <span className={`mx-8 ${textColor || defaultTextColor} font-medium text-sm md:text-base flex items-center gap-2`}>
    //       FREE SHIPPING ON ORDERS ABOVE PKR 10,000
    //     </span>
    //     <span className={`mx-8 ${textColor || defaultTextColor} font-medium text-sm md:text-base flex items-center gap-2`}>
    //       FREE SHIPPING ON ORDERS ABOVE PKR 10,000
    //     </span>
    //     <span className={`mx-8 ${textColor || defaultTextColor} font-medium text-sm md:text-base flex items-center gap-2`}>
    //       FREE SHIPPING ON ORDERS ABOVE PKR 10,000
    //     </span>
    //     <span className={`mx-8 ${textColor || defaultTextColor} font-medium text-sm md:text-base flex items-center gap-2`}>
    //       FREE SHIPPING ON ORDERS ABOVE PKR 10,000
    //     </span>
    //   </div>
    //   <style jsx>{`
    //     @keyframes marquee {
    //       0% {
    //         transform: translateX(0%);
    //       }
    //       100% {
    //         transform: translateX(-50%);
    //       }
    //     }
    //     .animate-marquee {
    //       display: flex;
    //       animation: marquee 20s linear infinite;
    //     }
    //     .animate-marquee:hover {
    //       animation-play-state: paused;
    //     }
    //   `}</style>
    // </div>
  );
};

export default DeliveryMarquee;
