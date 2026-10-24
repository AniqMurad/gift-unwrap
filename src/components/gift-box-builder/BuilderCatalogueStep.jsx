import { useEffect, useMemo, useRef, useState } from "react";
import CartoonButton from "../ui/cartoon-button";
import { FilterChoice, FilterDropdown, PriceFilter } from "./BuilderStepOne";
import BuilderHero from "./BuilderHero";
import BuilderGiftDrawer from "./BuilderGiftDrawer";
import { formatPrice, getProductId, getProductPrice, getProductSearchText, isUnavailable } from "./builder-utils";
import { getBoxCapacity, getBuilderCardPrice, getBuilderStepError } from "./builder-card-state";
import "../../styles/builder-catalogue.css";

const OCCASION_KEYS = ["occasion", "occasions", "tags", "collection", "collections"];
const PROFILE_KEYS = ["profile", "profiles", "recipient", "recipients", "audience", "tags"];
const SORT_OPTIONS = [["new", "New"], ["high-low", "Price: High to Low"], ["low-high", "Price: Low to High"]];
const metadataOptions = (items, keys) => Array.from(new Set(items.flatMap(item => keys.flatMap(key => {
  const value = item[key];
  return (Array.isArray(value) ? value : [value]).filter(Boolean).flatMap(entry => String(entry).split(",")).map(entry => entry.trim()).filter(Boolean);
})))).sort((a, b) => a.localeCompare(b));

export default function BuilderCatalogueStep({ step, catalogue, giftBoxItems, selectedBox, selectedCard, cardDetails, dataLoading, onSelect, onStepChange, onQuantityChange, onRemove, onRemoveCard, onEditCard, onNext, drawerOpen, onDrawerOpenChange }) {
  const isCards = step === 3;
  const getPrice = isCards ? getBuilderCardPrice : getProductPrice;
  const chosen = isCards ? selectedCard : selectedBox;
  const filterRef = useRef(null);
  const [openFilter, setOpenFilter] = useState("");
  const [occasion, setOccasion] = useState("");
  const [profile, setProfile] = useState("");
  const [sort, setSort] = useState("");
  const prices = catalogue.map(getPrice);
  const lower = prices.length ? Math.floor(Math.min(...prices)) : 0;
  const upper = prices.length ? Math.ceil(Math.max(...prices)) : 0;
  const [range, setRange] = useState([lower, upper]);
  useEffect(() => setRange([lower, upper]), [lower, upper]);
  useEffect(() => {
    const outside = event => { if (!filterRef.current?.contains(event.target)) setOpenFilter(""); };
    const escape = event => { if (event.key === "Escape") setOpenFilter(""); };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, []);
  const occasionOptions = useMemo(() => metadataOptions(catalogue, OCCASION_KEYS), [catalogue]);
  const profileOptions = useMemo(() => metadataOptions(catalogue, PROFILE_KEYS), [catalogue]);
  const visible = catalogue.filter(item => getPrice(item) >= range[0] && getPrice(item) <= range[1])
    .filter(item => !occasion || getProductSearchText(item, OCCASION_KEYS).includes(occasion.toLowerCase()))
    .filter(item => !profile || getProductSearchText(item, PROFILE_KEYS).includes(profile.toLowerCase()))
    .sort((a, b) => sort === "high-low" ? getPrice(b) - getPrice(a) : sort === "low-high" ? getPrice(a) - getPrice(b) : new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  const error = getBuilderStepError(step, giftBoxItems, selectedBox, selectedCard, cardDetails);
  const quantity = giftBoxItems.reduce((sum, item) => sum + Number(item.quantity), 0);
  const nextLabel = isCards ? "Complete Box" : "Next: Add a Card";
  const filters = [
    { label: "Occasion", key: "occasion", options: occasionOptions, value: occasion, set: setOccasion },
    { label: "Profile", key: "profile", options: profileOptions, value: profile, set: setProfile },
  ];
  return <div className={`gu-builder-page gu-builder-page--catalogue gu-builder-page--catalogue-${step}`}>
    <BuilderHero step={step} onStepChange={onStepChange} />
    <main className="gu-builder-main">
      <div className="gu-builder-filter-row" ref={filterRef}>
        <div className="gu-builder-filter-group">
          {filters.filter(filter => filter.options.length).map(filter => <FilterDropdown key={filter.key} label={filter.label} value={filter.value} open={openFilter === filter.key} onToggle={() => setOpenFilter(openFilter === filter.key ? "" : filter.key)} className={`gu-builder-filter--${filter.key}`}>
            <div role="menu" aria-label={filter.label}>{filter.options.map(choice => <FilterChoice key={choice} active={choice === filter.value} onClick={() => { filter.set(filter.value === choice ? "" : choice); setOpenFilter(""); }}>{choice}</FilterChoice>)}</div>
          </FilterDropdown>)}
          {upper > lower && <PriceFilter bounds={[lower, upper]} range={range} setRange={setRange} open={openFilter === "price"} onToggle={() => setOpenFilter(openFilter === "price" ? "" : "price")} />}
        </div>
        <FilterDropdown label="Sort By" value={SORT_OPTIONS.find(([value]) => value === sort)?.[1]} open={openFilter === "sort"} onToggle={() => setOpenFilter(openFilter === "sort" ? "" : "sort")} className="gu-builder-filter--sort">
          <div role="menu" aria-label="Sort designs">{SORT_OPTIONS.filter(([value]) => upper > lower || value === "new").map(([value, label]) => <FilterChoice key={value} active={value === sort} onClick={() => { setSort(value); setOpenFilter(""); }}>{label}</FilterChoice>)}</div>
        </FilterDropdown>
      </div>
      <section className="gu-builder-revised-catalogue" aria-label={isCards ? "Choose a greeting card" : "Choose a box"}>
        {dataLoading ? <p className="gu-builder-catalog-state">Loading designs…</p> : visible.length ? <div className="gu-builder-design-grid">
          {visible.map(item => {
            const selected = getProductId(item) === getProductId(chosen);
            const unavailable = isUnavailable(item, item.selectedColor);
            const tooSmall = !isCards && quantity > getBoxCapacity(item);
            const price = getPrice(item);
            const originalPrice = !isCards ? Number(item.originalPrice || item.compareAtPrice || item.compare_at_price) || 0 : 0;
            const sale = originalPrice > price;
            const image = item.image || item.images?.[0];
            return <article className={`gu-builder-design-card${selected ? " is-selected" : ""}`} key={getProductId(item)}>
              <button className="gu-builder-design-image" type="button" onClick={event => onSelect(item, event.currentTarget)} disabled={unavailable || tooSmall} aria-label={`${selected ? "Edit" : "Select"} ${item.name}`}>
                {image && <img src={image} alt={item.name} loading="lazy" decoding="async" />}
                {sale && <span className="gu-builder-product-badge">Sale</span>}
                {selected && <span className="gu-builder-design-check" aria-hidden="true">✓</span>}
              </button>
              <h3>{item.name}</h3>
              <div className="gu-builder-product-price"><strong>{formatPrice(price)}</strong>{sale && <><s>{formatPrice(originalPrice)}</s><span>-{Math.round((1 - price / originalPrice) * 100)}%</span></>}</div>
              <button className="gu-builder-design-select" type="button" aria-pressed={selected} disabled={unavailable || tooSmall} onClick={event => onSelect(item, event.currentTarget)}>{unavailable ? "Unavailable" : tooSmall ? "Too small for your goodies" : selected ? isCards ? "Edit Message" : "Selected" : "Select Design"}</button>
            </article>;
          })}
        </div> : <div className="gu-builder-catalog-state"><p>{isCards ? "No greeting cards are available. You can complete your box without a card." : "No box designs match your filters."}</p>{catalogue.length > 0 && <button type="button" onClick={() => { setOccasion(""); setProfile(""); setRange([lower, upper]); setSort(""); }}>Clear filters</button>}</div>}
        {isCards && selectedCard && <button className="gu-builder-without-card" type="button" onClick={onRemoveCard}>Continue without a greeting card</button>}
        {error && <p className="gu-builder-step-warning" role="status">{error}</p>}
      </section>
    </main>
    <BuilderGiftDrawer items={giftBoxItems} selectedBox={selectedBox} selectedCard={selectedCard} cardDetails={cardDetails} onEditCard={onEditCard} onRemoveCard={onRemoveCard} onQuantityChange={onQuantityChange} onRemove={onRemove} onNext={onNext} nextLabel={nextLabel} canContinue={!error} validationMessage={error} open={drawerOpen} onOpenChange={onDrawerOpenChange} />
    <nav className="gu-builder-bottom-bar" aria-label="Builder navigation">
      <button type="button" className="gu-builder-back" onClick={() => onStepChange(step - 1)}>Back</button>
      <CartoonButton label={nextLabel} color="#ff2b3a" disabled={Boolean(error)} onClick={onNext} />
    </nav>
  </div>;
}
