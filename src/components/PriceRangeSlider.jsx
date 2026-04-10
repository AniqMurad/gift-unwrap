import { useRef, useEffect, useCallback } from "react";

const SLIDER_MAX = 50000;

export default function PriceRangeSlider({
  minVal,
  maxVal,
  onMinChange,
  onMaxChange,
  max = SLIDER_MAX,
  step = 500,
}) {
  const rangeRef = useRef(null);

  const getPercent = useCallback(
    (value) => Math.round(((value - 0) / (max - 0)) * 100),
    [max]
  );

  // Update the filled track between the two thumbs
  useEffect(() => {
    if (rangeRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  return (
    <div className="flex flex-col gap-1 min-w-[180px] sm:min-w-[220px]">
      <div className="flex items-center justify-between text-xs text-[#696C70] font-medium">
        <span>Price</span>
        <span className="text-[#1F1F1F] font-semibold">
          PKR {minVal.toLocaleString()} – PKR {maxVal.toLocaleString()}
        </span>
      </div>

      {/* Slider track container */}
      <div className="relative h-5 flex items-center">
        {/* Background track */}
        <div className="absolute w-full h-[3px] bg-[#E9E9E9] rounded" />

        {/* Filled range track */}
        <div
          ref={rangeRef}
          className="absolute h-[3px] bg-[#1F1F1F] rounded"
        />

        {/* Min thumb */}
        <input
          type="range"
          min={0}
          max={max}
          step={step}
          value={minVal}
          onChange={(e) => {
            const val = Math.min(Number(e.target.value), maxVal - step);
            onMinChange(val);
          }}
          style={{
            position: "absolute",
            width: "100%",
            height: "3px",
            background: "transparent",
            WebkitAppearance: "none",
            appearance: "none",
            pointerEvents: "none",
            zIndex: minVal > max - step ? 5 : 3,
          }}
          className="range-thumb"
        />

        {/* Max thumb */}
        <input
          type="range"
          min={0}
          max={max}
          step={step}
          value={maxVal}
          onChange={(e) => {
            const val = Math.max(Number(e.target.value), minVal + step);
            onMaxChange(val);
          }}
          style={{
            position: "absolute",
            width: "100%",
            height: "3px",
            background: "transparent",
            WebkitAppearance: "none",
            appearance: "none",
            pointerEvents: "none",
            zIndex: 4,
          }}
          className="range-thumb"
        />
      </div>

      <style>{`
        .range-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #1F1F1F;
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.25);
          pointer-events: all;
          cursor: pointer;
        }
        .range-thumb::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #1F1F1F;
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.25);
          pointer-events: all;
          cursor: pointer;
        }
        .range-thumb:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}
