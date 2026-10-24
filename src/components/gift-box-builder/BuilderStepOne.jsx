import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Minus, Plus, Trash2 } from "lucide-react";
import LandingHeader from "../LandingHeader";
import CartoonButton from "../ui/cartoon-button";
import BuilderGiftDrawer from "./BuilderGiftDrawer";
import { getBuilderDrawerSummary } from "./builder-drawer-summary";
import "../../styles/builder-step-one.css";
import chooseGoodiesIcon from "../../assets/gift-box-builder/choose-goodies.png";
import pickABoxIcon from "../../assets/gift-box-builder/pick-a-box.png";
import addACardIcon from "../../assets/gift-box-builder/add-a-card.png";
import connectorOne from "../../assets/gift-box-builder/connector-one.svg";
import connectorTwo from "../../assets/gift-box-builder/connector-two.svg";
import inYourBoxHeading from "../../assets/gift-box-builder/in-your-box.svg";
import {
  formatPrice,
  getProductId,
  getProductPrice,
  getProductSearchText,
  getStockLimit,
  isUnavailable,
} from "./builder-utils";

const OCCASIONS = ["Birthday", "Anniversary", "Thank You"];
const PROFILES = ["For Him", "For Her"];
const SORT_OPTIONS = [
  ["new", "New"],
  ["high-low", "Price: High to Low"],
  ["low-high", "Price: Low to High"],
];
const OCCASION_KEYS = ["occasion", "occasions", "tags", "collection", "collections"];
const PROFILE_KEYS = ["profile", "profiles", "recipient", "recipients", "audience", "tags"];

function FilterDropdown({ label, value, open, onToggle, children, className = "" }) {
  return (
    <div className={`gu-builder-filter ${className}${open ? " is-open" : ""}`}>
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span>{value || label}</span>
        <ChevronDown aria-hidden="true" size={20} strokeWidth={1.8} />
      </button>
      {open && <div className="gu-builder-filter-menu">{children}</div>}
    </div>
  );
}

function FilterChoice({ active, children, onClick }) {
  return (
    <button
      className={active ? "is-selected" : ""}
      type="button"
      role="menuitemradio"
      aria-checked={active}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function PriceFilter({ bounds, range, setRange, open, onToggle }) {
  const rangeMinimum = range[0];
  const rangeMaximum = range[1];
  const [draftMin, setDraftMin] = useState(String(range[0]));
  const [draftMax, setDraftMax] = useState(String(range[1]));
  const [minimum, maximum] = bounds;
  const spread = Math.max(1, maximum - minimum);
  const left = ((range[0] - minimum) / spread) * 100;
  const right = 100 - ((range[1] - minimum) / spread) * 100;
  const hasCustomRange = range[0] !== minimum || range[1] !== maximum;

  useEffect(() => setDraftMin(String(rangeMinimum)), [rangeMinimum]);
  useEffect(() => setDraftMax(String(rangeMaximum)), [rangeMaximum]);

  const commitMinimum = () => {
    const next = Math.max(minimum, Math.min(Number(draftMin) || minimum, range[1]));
    setRange([Math.round(next), range[1]]);
  };
  const commitMaximum = () => {
    const next = Math.min(maximum, Math.max(Number(draftMax) || maximum, range[0]));
    setRange([range[0], Math.round(next)]);
  };

  return (
    <FilterDropdown
      label="Price Range"
      value={hasCustomRange ? `${range[0].toLocaleString("en-PK")}–${range[1].toLocaleString("en-PK")} PKR` : ""}
      open={open}
      onToggle={onToggle}
      className="gu-builder-filter--price"
    >
      <div className="gu-builder-price-filter" aria-label="Price range">
        <p>Price Range</p>
        <div className="gu-builder-range">
          <div className="gu-builder-range-track" />
          <div className="gu-builder-range-active" style={{ left: `${left}%`, right: `${right}%` }} />
          <input
            aria-label="Minimum price"
            type="range"
            min={minimum}
            max={maximum}
            value={range[0]}
            onChange={(event) => setRange([Math.min(Number(event.target.value), range[1]), range[1]])}
          />
          <input
            aria-label="Maximum price"
            type="range"
            min={minimum}
            max={maximum}
            value={range[1]}
            onChange={(event) => setRange([range[0], Math.max(Number(event.target.value), range[0])])}
          />
        </div>
        <div className="gu-builder-price-fields">
          <label>
            <span>Min price</span>
            <span className="gu-builder-price-input"><input
                inputMode="numeric"
                value={draftMin}
                onChange={(event) => setDraftMin(event.target.value.replace(/[^0-9]/g, ""))}
                onBlur={commitMinimum}
                onKeyDown={(event) => event.key === "Enter" && event.currentTarget.blur()}
              /><span>PKR</span></span>
          </label>
          <label>
            <span>Max price</span>
            <span className="gu-builder-price-input"><input
                inputMode="numeric"
                value={draftMax}
                onChange={(event) => setDraftMax(event.target.value.replace(/[^0-9]/g, ""))}
                onBlur={commitMaximum}
                onKeyDown={(event) => event.key === "Enter" && event.currentTarget.blur()}
              /><span>PKR</span></span>
          </label>
        </div>
      </div>
    </FilterDropdown>
  );
}

function StepIndicator() {
  return (
    <ol className="gu-builder-steps" aria-label="Build a gift box progress">
      <li className="is-current" aria-current="step">
        <span className="gu-builder-step-icon"><img src={chooseGoodiesIcon} alt="" /></span>
        <span className="gu-builder-step-label"><b>1.</b> Choose Goodies</span>
      </li>
      <img className="gu-builder-step-connector" src={connectorOne} alt="" aria-hidden="true" />
      <li>
        <span className="gu-builder-step-icon"><img src={pickABoxIcon} alt="" /></span>
        <span className="gu-builder-step-label"><b>2.</b> Pick a Box</span>
      </li>
      <img className="gu-builder-step-connector" src={connectorTwo} alt="" aria-hidden="true" />
      <li>
        <span className="gu-builder-step-icon"><img src={addACardIcon} alt="" /></span>
        <span className="gu-builder-step-label"><b>3.</b> Add a Card</span>
      </li>
    </ol>
  );
}

function QuantityControl({ quantity, max, onChange, compact = false }) {
  return (
    <div className={`gu-builder-quantity${compact ? " is-compact" : ""}`} aria-label={`${quantity} in box`}>
      <button type="button" aria-label="Remove one" onClick={() => onChange(quantity - 1)}>
        <Minus aria-hidden="true" size={compact ? 14 : 17} />
      </button>
      <span>{compact ? quantity : `${quantity} in box`}</span>
      <button type="button" aria-label="Add one" disabled={quantity >= max} onClick={() => onChange(quantity + 1)}>
        <Plus aria-hidden="true" size={compact ? 14 : 17} />
      </button>
    </div>
  );
}

function ProductCard({ product, selectedColor, item, onAdd, onQuantityChange, onQuickView }) {
  const selectedVariant = selectedColor
    ? product.colorVariants?.find((variant) => variant.color === selectedColor)
    : null;
  const image = selectedVariant?.image || product.image || product.images?.[0];
  const unavailable = isUnavailable(product, selectedColor);
  const max = getStockLimit(product, selectedColor);
  const originalPrice = Number(product.originalPrice || product.compareAtPrice || product.compare_at_price) || 0;
  const isOnSale = originalPrice > getProductPrice(product);
  const discount = isOnSale ? Math.round((1 - (getProductPrice(product) / originalPrice)) * 100) : 0;

  return (
    <article className={`gu-builder-product-card${item ? " is-selected" : ""}`}>
      <button className="gu-builder-product-image" type="button" onClick={() => onQuickView(product)}>
        <img src={image} alt={product.name} loading="lazy" decoding="async" />
        {(isOnSale || product.isNew || product.newArrival) && <span className="gu-builder-product-badge">{isOnSale ? "Sale" : "New"}</span>}
      </button>
      <div className="gu-builder-product-copy">
        <h3><button className="gu-builder-product-name" type="button" onClick={() => onQuickView(product)}>{product.name}</button></h3>
        <div className="gu-builder-product-price">
          <strong>{formatPrice(product.price)}</strong>
          {isOnSale && <><s>{formatPrice(originalPrice)}</s><span>-{discount}%</span></>}
        </div>
        {item ? (
          <QuantityControl quantity={item.quantity} max={max} onChange={(quantity) => onQuantityChange(item.cartKey, quantity)} />
        ) : (
          <button className="gu-builder-add" type="button" disabled={unavailable} onClick={() => onAdd(product, selectedColor)}>
            {unavailable ? "Unavailable" : "Add To Box"}
          </button>
        )}
      </div>
    </article>
  );
}

function BuilderSummary({
  items,
  selectedBox,
  boxConflict,
  onQuantityChange,
  onRemove,
  headingAsset = inYourBoxHeading,
  includeBoxPrice = false,
  totalLabel = "Subtotal:",
  shippingText = "",
}) {
  const productsTotal = items.reduce((sum, item) => sum + getProductPrice(item) * item.quantity, 0);
  const subtotal = productsTotal + (includeBoxPrice && selectedBox ? getProductPrice(selectedBox) : 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <aside className="gu-builder-summary" aria-labelledby="gu-builder-summary-title">
      <div className="gu-builder-summary-heading">
        <img src={headingAsset} alt="" aria-hidden="true" />
        <h2 className="sr-only" id="gu-builder-summary-title">In Your Box</h2>
      </div>
      <div className="gu-builder-summary-total">
        <div className="gu-builder-summary-total-amount">
          <span>{totalLabel}</span>
          <strong>{formatPrice(subtotal)}</strong>
        </div>
        {shippingText && <small>{shippingText}</small>}
      </div>
      <section className={`gu-builder-summary-section gu-builder-summary-box-section${selectedBox ? " has-box" : " is-empty"}`}>
        <h3>Box</h3>
        {selectedBox ? (
          <article className="gu-builder-summary-box-card">
            <img src={selectedBox.image || selectedBox.images?.[0]} alt={selectedBox.name} />
            <p>{selectedBox.name}</p>
            <strong>{formatPrice(selectedBox.price)}</strong>
          </article>
        ) : <p className="gu-builder-summary-placeholder">Choose your box in step 2</p>}
      </section>
      <section className="gu-builder-summary-section gu-builder-summary-products">
        <h3>Products</h3>
        {items.length === 0 ? (
          <div className="gu-builder-summary-empty">
            <p>Your box is ready for something thoughtful.</p>
            <span>Add a goodie to get started.</span>
          </div>
        ) : (
          <div className="gu-builder-summary-items">
            {items.map((item) => (
              <article className="gu-builder-summary-item" key={item.cartKey}>
                <img src={item.image || item.images?.[0]} alt={item.name} />
                <div className="gu-builder-summary-item-copy">
                  <h4>{item.name}</h4>
                  {item.selectedColor && <p>{item.selectedColor}</p>}
                  <strong>{formatPrice(getProductPrice(item) * item.quantity)}</strong>
                </div>
                <div className="gu-builder-summary-item-actions">
                  <QuantityControl compact quantity={item.quantity} max={getStockLimit(item, item.selectedColor)} onChange={(quantity) => onQuantityChange(item.cartKey, quantity)} />
                  <button className="gu-builder-summary-remove" type="button" aria-label={`Remove ${item.name}`} onClick={() => onRemove(item.cartKey)}>
                    <Trash2 aria-hidden="true" size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <span className="sr-only">{itemCount} items selected</span>
      {boxConflict && <p className="gu-builder-box-warning">Your saved box is too small for the current selection. Choose a suitable box in step 2.</p>}
    </aside>
  );
}

export {
  BuilderSummary,
  FilterChoice,
  FilterDropdown,
  PriceFilter,
};

export default function BuilderStepOne({
  products,
  giftBoxItems,
  selectedBox,
  selectedColors,
  selectedCard,
  cardDetails,
  onEditCard,
  onRemoveCard,
  drawerOpen,
  onDrawerOpenChange,
  dataLoading,
  onAdd,
  onQuantityChange,
  onRemove,
  onQuickView,
  onBack,
  onNext,
}) {
  const filterAreaRef = useRef(null);
  const [openFilter, setOpenFilter] = useState("");
  const [occasion, setOccasion] = useState("");
  const [profile, setProfile] = useState("");
  const [sort, setSort] = useState("");
  const bounds = useMemo(() => {
    const prices = products.map(getProductPrice).filter(Number.isFinite);
    return prices.length
      ? [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))]
      : [0, 10000];
  }, [products]);
  const normalizedBounds = bounds[0] === bounds[1] ? [0, Math.max(1000, bounds[1])] : bounds;
  const lowerBound = normalizedBounds[0];
  const upperBound = normalizedBounds[1];
  const [range, setRange] = useState(normalizedBounds);

  useEffect(() => setRange([lowerBound, upperBound]), [lowerBound, upperBound]);
  useEffect(() => {
    const close = (event) => {
      if (!filterAreaRef.current?.contains(event.target)) setOpenFilter("");
    };
    const closeOnEscape = (event) => event.key === "Escape" && setOpenFilter("");
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const hasOccasionMetadata = products.some((product) => getProductSearchText(product, OCCASION_KEYS));
  const hasProfileMetadata = products.some((product) => getProductSearchText(product, PROFILE_KEYS));

  const visibleProducts = useMemo(() => products
    .filter((product) => getProductPrice(product) >= range[0] && getProductPrice(product) <= range[1])
    .filter((product) => !occasion || !hasOccasionMetadata || getProductSearchText(product, OCCASION_KEYS).includes(occasion.toLowerCase()))
    .filter((product) => !profile || !hasProfileMetadata || getProductSearchText(product, PROFILE_KEYS).includes(profile.replace("For ", "").toLowerCase()))
    .sort((a, b) => {
      if (sort === "high-low") return getProductPrice(b) - getProductPrice(a);
      if (sort === "low-high") return getProductPrice(a) - getProductPrice(b);
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }), [products, range, occasion, profile, sort, hasOccasionMetadata, hasProfileMetadata]);

  const selectedItemFor = (product) => {
    const productId = getProductId(product);
    const color = selectedColors[productId] || null;
    const cartKey = color ? `${productId}_${color}` : productId;
    return giftBoxItems.find((item) => item.cartKey === cartKey);
  };
  const { itemCount: totalQuantity, canContinue } = getBuilderDrawerSummary(giftBoxItems, selectedBox);

  return (
    <div className="gu-builder-page gu-builder-page--drawer">
      <section className="gu-builder-hero">
        <LandingHeader variant="builder" />
        <div className="gu-builder-hero-copy">
          <h1>Build a Gift Box<br />That Feels Like Them</h1>
          <p>You know their little favourites. Pick the gifts, choose a box, and add the words only you could write. We’ll bring it all together with care.</p>
        </div>
        <StepIndicator />
      </section>

      <main className="gu-builder-main">
        <div className="gu-builder-filter-row" ref={filterAreaRef}>
          <div className="gu-builder-filter-group">
            <FilterDropdown label="Occasion" value={occasion} open={openFilter === "occasion"} onToggle={() => setOpenFilter(openFilter === "occasion" ? "" : "occasion")}>
              <div role="menu" aria-label="Occasion">
                {OCCASIONS.map((choice) => <FilterChoice key={choice} active={occasion === choice} onClick={() => { setOccasion(occasion === choice ? "" : choice); setOpenFilter(""); }}>{choice}</FilterChoice>)}
              </div>
            </FilterDropdown>
            <FilterDropdown label="Profile" value={profile} open={openFilter === "profile"} onToggle={() => setOpenFilter(openFilter === "profile" ? "" : "profile")} className="gu-builder-filter--profile">
              <div role="menu" aria-label="Profile">
                {PROFILES.map((choice) => <FilterChoice key={choice} active={profile === choice} onClick={() => { setProfile(profile === choice ? "" : choice); setOpenFilter(""); }}>{choice}</FilterChoice>)}
              </div>
            </FilterDropdown>
            <PriceFilter bounds={normalizedBounds} range={range} setRange={setRange} open={openFilter === "price"} onToggle={() => setOpenFilter(openFilter === "price" ? "" : "price")} />
          </div>
          <FilterDropdown label="Sort By" value={SORT_OPTIONS.find(([value]) => value === sort)?.[1]} open={openFilter === "sort"} onToggle={() => setOpenFilter(openFilter === "sort" ? "" : "sort")} className="gu-builder-filter--sort">
            <div role="menu" aria-label="Sort products">
              {SORT_OPTIONS.map(([value, label]) => <FilterChoice key={value} active={sort === value} onClick={() => { setSort(value); setOpenFilter(""); }}>{label}</FilterChoice>)}
            </div>
          </FilterDropdown>
        </div>

        <div className="gu-builder-content">
          <section className="gu-builder-catalog" aria-label="Choose goodies">
            {dataLoading ? (
              <p className="gu-builder-catalog-state">Loading goodies…</p>
            ) : visibleProducts.length ? (
              <div className="gu-builder-product-grid">
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={getProductId(product)}
                    product={product}
                    selectedColor={selectedColors[getProductId(product)] || null}
                    item={selectedItemFor(product)}
                    onAdd={onAdd}
                    onQuantityChange={onQuantityChange}
                    onQuickView={onQuickView}
                  />
                ))}
              </div>
            ) : (
              <div className="gu-builder-catalog-state">
                <p>No goodies match those filters.</p>
                <button type="button" onClick={() => { setOccasion(""); setProfile(""); setRange([lowerBound, upperBound]); setSort(""); }}>Clear filters</button>
              </div>
            )}
          </section>
        </div>
      </main>

      <BuilderGiftDrawer items={giftBoxItems} selectedBox={selectedBox} selectedCard={selectedCard} cardDetails={cardDetails} onEditCard={onEditCard} onRemoveCard={onRemoveCard} open={drawerOpen} onOpenChange={onDrawerOpenChange} onQuantityChange={onQuantityChange} onRemove={onRemove} onNext={onNext} />

      <nav className="gu-builder-bottom-bar" aria-label="Builder navigation">
        <button className="gu-builder-back" type="button" onClick={onBack}>Back</button>
        <span className="sr-only" aria-live="polite">
          {totalQuantity ? `${totalQuantity} ${totalQuantity === 1 ? "goodie" : "goodies"} selected` : "Choose at least one goodie to continue"}
        </span>
        <CartoonButton label="Next: Pick a Box" color="#ff2b3a" disabled={!canContinue} onClick={onNext} />
      </nav>
    </div>
  );
}
