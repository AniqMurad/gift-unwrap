import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  FilterChoice,
  FilterDropdown,
  PriceFilter,
} from "./gift-box-builder/BuilderStepOne";

function StaticFilter({ label, value, reason, className = "" }) {
  return (
    <div className={`gu-builder-filter ${reason ? "is-unavailable" : "is-fixed"} ${className}`.trim()}>
      <button
        type="button"
        disabled
        title={reason || undefined}
        aria-label={reason ? `${label}. ${reason}` : `${label}: ${value}`}
      >
        <span>{value || label}</span>
        <ChevronDown aria-hidden="true" size={20} strokeWidth={1.8} />
      </button>
    </div>
  );
}

export default function CollectionFilterBar({
  occasion,
  occasionOptions,
  occasionLabels,
  fixedOccasion,
  onOccasionChange,
  profile,
  profileOptions,
  profileLabels,
  onProfileChange,
  priceBounds,
  priceRange,
  onPriceRangeChange,
  priceDisabled = false,
  sort,
  sortOptions,
  onSortChange,
  sortingDisabled = false,
  onClear,
  hasFilters,
}) {
  const filterAreaRef = useRef(null);
  const [openFilter, setOpenFilter] = useState("");

  useEffect(() => {
    const close = (event) => {
      if (!filterAreaRef.current?.contains(event.target)) setOpenFilter("");
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpenFilter("");
    };

    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const choose = (setter, value) => {
    setter(value);
    setOpenFilter("");
  };

  return (
    <div className="gu-builder-filter-row gu-collection-builder-filters" ref={filterAreaRef}>
      <div className="gu-builder-filter-group">
        {fixedOccasion ? (
          <FilterDropdown
            label="Occasion"
            value={fixedOccasion.label}
            open={openFilter === "occasion"}
            onToggle={() => setOpenFilter(openFilter === "occasion" ? "" : "occasion")}
          >
            <div role="menu" aria-label="Occasion">
              <FilterChoice active onClick={() => setOpenFilter("")}>
                {fixedOccasion.label}
              </FilterChoice>
            </div>
          </FilterDropdown>
        ) : occasionOptions.length ? (
          <FilterDropdown
            label="Occasion"
            value={occasion ? occasionLabels[occasion] || occasion : ""}
            open={openFilter === "occasion"}
            onToggle={() => setOpenFilter(openFilter === "occasion" ? "" : "occasion")}
          >
            <div role="menu" aria-label="Occasion">
              {occasionOptions.map((value) => (
                <FilterChoice
                  key={value}
                  active={occasion === value}
                  onClick={() => choose(onOccasionChange, occasion === value ? "" : value)}
                >
                  {occasionLabels[value] || value}
                </FilterChoice>
              ))}
            </div>
          </FilterDropdown>
        ) : (
          <StaticFilter label="Occasion" reason="No occasion data is available for this collection" />
        )}

        {profileOptions.length ? (
          <FilterDropdown
            label="Profile"
            value={profile ? profileLabels[profile] || profile : ""}
            open={openFilter === "profile"}
            onToggle={() => setOpenFilter(openFilter === "profile" ? "" : "profile")}
            className="gu-builder-filter--profile"
          >
            <div role="menu" aria-label="Profile">
              {profileOptions.map((value) => (
                <FilterChoice
                  key={value}
                  active={profile === value}
                  onClick={() => choose(onProfileChange, profile === value ? "" : value)}
                >
                  {profileLabels[value] || value}
                </FilterChoice>
              ))}
            </div>
          </FilterDropdown>
        ) : (
          <StaticFilter
            label="Profile"
            reason="No profile data is available for this collection"
            className="gu-builder-filter--profile"
          />
        )}

        {priceDisabled ? (
          <StaticFilter
            label="Price Range"
            reason="Prices are not provided for this catalogue"
            className="gu-builder-filter--price"
          />
        ) : (
          <PriceFilter
            bounds={priceBounds}
            range={priceRange}
            setRange={onPriceRangeChange}
            open={openFilter === "price"}
            onToggle={() => setOpenFilter(openFilter === "price" ? "" : "price")}
          />
        )}
      </div>

      <div className="gu-collection-filter-actions">
        {hasFilters && (
          <button type="button" className="gu-clear-filters" onClick={onClear}>
            Clear filters
          </button>
        )}
        {sortingDisabled ? (
          <StaticFilter
            label="Sort By"
            reason="Sorting is unavailable for this catalogue"
            className="gu-builder-filter--sort"
          />
        ) : (
          <FilterDropdown
            label="Sort By"
            value=""
            open={openFilter === "sort"}
            onToggle={() => setOpenFilter(openFilter === "sort" ? "" : "sort")}
            className="gu-builder-filter--sort"
          >
            <div role="menu" aria-label="Sort products">
              {sortOptions.map(({ value, label }) => (
                <FilterChoice
                  key={value}
                  active={sort === value}
                  onClick={() => choose(onSortChange, value)}
                >
                  {label}
                </FilterChoice>
              ))}
            </div>
          </FilterDropdown>
        )}
      </div>
    </div>
  );
}
