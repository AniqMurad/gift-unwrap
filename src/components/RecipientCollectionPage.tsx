import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import LandingFooter from "./LandingFooter";
import LandingHeader from "./LandingHeader";
import Product from "./Product";
import stepAddMessage from "../assets/redesign/step-add-message.png";
import stepChooseBox from "../assets/redesign/step-choose-box.png";
import stepPickGifts from "../assets/redesign/step-pick-gifts.png";
import stepSend from "../assets/redesign/step-send-updated.png";
import { fetchGreetingCards, fetchProductCollections } from "../config/api";
import type { RecipientCollectionConfig } from "../config/recipientCollections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import CartoonButton from "./ui/cartoon-button";
import FeatureCard from "./ui/feature-card-1";
import ProductScrollReveal from "./ui/product-scroll-reveal";
import GreetingCardCollectionItem from "./GreetingCardCollectionItem";
import CollectionFilterBar from "./CollectionFilterBar";

interface StoreProduct {
  id: number | string;
  name: string;
  price?: number;
  keyGift?: string;
  subcategory?: string;
  image?: string;
  images?: string[];
  originalPrice?: number | null;
  discount?: number | null;
  available?: boolean;
  inStock?: boolean;
  stock?: number;
  category?: string;
  [key: string]: unknown;
}

interface ProductCollection {
  category: string;
  products: StoreProduct[];
}

interface GreetingCardRecord extends StoreProduct {
  design?: string;
  color?: string;
}

interface RecipientCollectionPageProps {
  config: RecipientCollectionConfig;
}

const PAGE_SIZE = 16;
const fallbackOccasions = ["birthday", "anniversary", "thank-you"];

const builderImages = [
  { imageSrc: stepChooseBox, imageWidth: 186, imageHeight: 131 },
  { imageSrc: stepPickGifts, imageWidth: 174, imageHeight: 129 },
  { imageSrc: stepAddMessage, imageWidth: 162, imageHeight: 134 },
  {
    imageSrc: stepSend,
    imageWidth: 196,
    imageHeight: 154,
    imageOffsetX: -16,
  },
];

const herBuilderImages = [
  { imageSrc: stepPickGifts, imageWidth: 154, imageHeight: 115, imageOffsetY: -3.5 },
  { imageSrc: stepChooseBox, imageWidth: 144, imageHeight: 101, imageOffsetY: 0.5 },
  { imageSrc: stepAddMessage, imageWidth: 134, imageHeight: 111, imageOffsetY: -1.5 },
  {
    imageSrc: stepSend,
    imageWidth: 196,
    imageHeight: 154,
    imageOffsetX: -16,
    imageOffsetY: -8,
  },
];

const labelFromValue = (value: string, labels: Record<string, string>) =>
  labels[value] ||
  value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const matchesPrice = (product: StoreProduct, range: [number, number]) => {
  const price = Number(product.price);
  return Number.isFinite(price) && price >= range[0] && price <= range[1];
};

const matchesOccasionText = (product: StoreProduct, occasion: string) => {
  const searchableText = [
    product.name,
    product.subcategory,
    product.shortDescription,
    product.longDescription,
    product.metaTitle,
    product.metaDescription,
    product.design,
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase();
  const term = occasion.replace(/[-_]+/g, " ").toLocaleLowerCase();
  return searchableText.includes(term);
};

const matchesBirthdayScope = (product: StoreProduct) =>
  [
    product.name,
    product.subcategory,
    product.shortDescription,
    product.longDescription,
    product.metaTitle,
    product.metaDescription,
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase()
    .includes("birthday");

// The current catalogue contract does not expose an approved personalization
// category, tag, or boolean. Keep this scope empty rather than presenting
// ordinary products as personalizable. Once the backend provides a classifier,
// this is the single place where it can be connected to the shared collection.
const matchesPersonalizedScope = (_product: StoreProduct) => false;

const matchesFloralScope = (product: StoreProduct) =>
  [
    product.name,
    product.shortDescription,
    product.longDescription,
    product.metaTitle,
    product.metaDescription,
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase()
    .match(/\bflowers?\b|\bfloral\s+(?:arrangement|bouquet|design)\b/) !== null;

const SWEET_TREAT_TERMS =
  /\b(?:cake|cakes|brownie|brownies|cookie|cookies|choco|chocolate|chocolates|truffle|truffles|dessert|desserts|snack|snacks|candy|candies|confection|confections)\b|\bsweet treats?\b/;

const matchesSweetTreatScope = (product: StoreProduct) => {
  const name = product.name.toLocaleLowerCase();
  if (product.category !== "FlowersChocolates") {
    return SWEET_TREAT_TERMS.test(name);
  }

  return [
    product.name,
    product.shortDescription,
    product.longDescription,
    product.metaTitle,
    product.metaDescription,
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase()
    .match(SWEET_TREAT_TERMS) !== null;
};

export default function RecipientCollectionPage({
  config,
}: RecipientCollectionPageProps) {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const usesGreetingCardData = config.dataSource === "greetingCards";
  const profile = usesGreetingCardData || config.profileFilteringSupported === false
    ? ""
    : searchParams.get("profile") || "";
  const occasion = config.fixedOccasion?.value || searchParams.get("occasion") || "";
  const sort = config.sortingSupported === false
    ? "featured"
    : searchParams.get("sort") || "featured";
  const requestedPage = Math.max(1, Number(searchParams.get("page")) || 1);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    const request = config.dataSource === "greetingCards"
      ? fetchGreetingCards()
      : fetchProductCollections();

    request
      .then(({ data }: { data: unknown }) => {
        if (!active) return;
        const records = Array.isArray(data) ? data : [];
        if (config.dataSource === "greetingCards") {
          setProducts(
            (records as GreetingCardRecord[]).filter(
              (card) => card.inStock !== false,
            ),
          );
          return;
        }
        const collections = records as ProductCollection[];
        const sourceCollectionIds = config.sourceCollectionIds || [config.collectionId];
        const sourceProducts = collections
          .filter((entry) => sourceCollectionIds.includes(entry.category))
          .flatMap((entry) =>
            (Array.isArray(entry.products) ? entry.products : []).map((product) => ({
              ...product,
              category: entry.category,
            })),
          );
        const scopedProducts = config.productScope === "birthday"
          ? sourceProducts.filter(matchesBirthdayScope)
          : config.productScope === "personalized"
            ? sourceProducts.filter(matchesPersonalizedScope)
            : config.productScope === "floral"
              ? sourceProducts.filter(matchesFloralScope)
              : config.productScope === "sweetTreats"
                ? sourceProducts.filter(matchesSweetTreatScope)
                : sourceProducts;
        setProducts(scopedProducts);
      })
      .catch(() => {
        if (active) {
          setProducts([]);
          setError("We couldn’t load this collection. Please try again.");
        }
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [config.collectionId, config.dataSource, config.productScope, config.sourceCollectionIds, retryKey]);

  const profiles = useMemo(
    () =>
      config.profileFilteringSupported === false
        ? []
        : Array.from(
          new Set(products.map((product) => product.keyGift).filter(Boolean)),
        ) as string[],
    [config.profileFilteringSupported, products],
  );

  const catalogueOccasions = useMemo(() => {
    if (config.fixedOccasion) return [config.fixedOccasion.value];
    return Array.from(
      new Set(
        products
          .map((product) => product.subcategory?.trim())
          .filter(Boolean),
      ),
    ) as string[];
  }, [config.fixedOccasion, products]);
  const occasions = config.fixedOccasion
    ? catalogueOccasions
    : catalogueOccasions.length ? catalogueOccasions : fallbackOccasions;

  const priceBounds = useMemo<[number, number]>(() => {
    const prices = products
      .map((product) => Number(product.price))
      .filter(Number.isFinite);
    if (!prices.length) return [0, 10000];
    const minimum = Math.floor(Math.min(...prices));
    const maximum = Math.ceil(Math.max(...prices));
    return minimum === maximum ? [0, Math.max(1000, maximum)] : [minimum, maximum];
  }, [products]);
  const requestedMinimum = Number(searchParams.get("minPrice"));
  const requestedMaximum = Number(searchParams.get("maxPrice"));
  const minimumPrice = Number.isFinite(requestedMinimum) && searchParams.has("minPrice")
    ? Math.max(priceBounds[0], Math.min(requestedMinimum, priceBounds[1]))
    : priceBounds[0];
  const maximumPrice = Number.isFinite(requestedMaximum) && searchParams.has("maxPrice")
    ? Math.min(priceBounds[1], Math.max(requestedMaximum, priceBounds[0]))
    : priceBounds[1];
  const priceRange: [number, number] = [
    Math.min(minimumPrice, maximumPrice),
    Math.max(minimumPrice, maximumPrice),
  ];

  const filteredProducts = useMemo(() => {
    const results = products.filter(
      (product) =>
        (!profile || product.keyGift === profile) &&
        (config.fixedOccasion ||
          !occasion ||
          (catalogueOccasions.length
            ? product.subcategory === occasion
            : matchesOccasionText(product, occasion))) &&
        (usesGreetingCardData || matchesPrice(product, priceRange)),
    );

    if (config.sortingSupported !== false && sort === "price-low") {
      return [...results].sort((a, b) => Number(a.price) - Number(b.price));
    }
    if (sort === "price-high") {
      return [...results].sort((a, b) => Number(b.price) - Number(a.price));
    }
    return results;
  }, [catalogueOccasions.length, config.fixedOccasion, config.sortingSupported, occasion, priceRange, products, profile, sort, usesGreetingCardData]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const pageProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  useEffect(() => {
    if (requestedPage <= totalPages) return;
    const next = new URLSearchParams(searchParams);
    if (totalPages === 1) next.delete("page");
    else next.set("page", String(totalPages));
    setSearchParams(next, { replace: true });
  }, [requestedPage, searchParams, setSearchParams, totalPages]);

  const setFilter = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    setSearchParams(next);
  };

  const setPriceRange = (range: [number, number]) => {
    const next = new URLSearchParams(searchParams);
    if (range[0] === priceBounds[0]) next.delete("minPrice");
    else next.set("minPrice", String(range[0]));
    if (range[1] === priceBounds[1]) next.delete("maxPrice");
    else next.set("maxPrice", String(range[1]));
    next.delete("price");
    next.delete("page");
    setSearchParams(next, { replace: true });
  };

  const setPage = (pageNumber: number) => {
    const next = new URLSearchParams(searchParams);
    if (pageNumber <= 1) next.delete("page");
    else next.set("page", String(pageNumber));
    setSearchParams(next);
    document
      .querySelector(".gu-collection-catalog")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearFilters = () => {
    const next = new URLSearchParams(searchParams);
    ["profile", "occasion", "price", "minPrice", "maxPrice", "sort", "page"].forEach((key) =>
      next.delete(key),
    );
    setSearchParams(next);
  };

  const hasFilters = Boolean(
    profile ||
      (!config.fixedOccasion && occasion) ||
      priceRange[0] !== priceBounds[0] ||
      priceRange[1] !== priceBounds[1] ||
      sort !== "featured",
  );

  return (
    <div className={`gu-page gu-collection-page gu-collection-page--${config.key}`}>
      <Helmet>
        <title>{config.seoTitle}</title>
        <meta name="description" content={config.seoDescription} />
        <link
          rel="canonical"
          href={`https://www.giftunwrap.com${config.route}`}
        />
      </Helmet>

      <section className="gu-collection-intro" aria-labelledby="collection-title">
        <LandingHeader />
        <div className="gu-collection-intro-copy">
          <h1 id="collection-title">
            {config.headingAmpersandSans ? (
              <>
                {config.heading.split("&")[0]}
                <span className="gu-collection-heading-ampersand">&</span>
                {config.heading.split("&").slice(1).join("&")}
              </>
            ) : config.heading}
          </h1>
          <p>{config.introduction}</p>
        </div>
      </section>

      <main className="gu-collection-main">
        <section className="gu-collection-catalog" aria-label={`${config.navigationLabel} products`}>
          <div className="gu-collection-filterbar">
            <CollectionFilterBar
              occasion={occasion}
              occasionOptions={occasions}
              occasionLabels={Object.fromEntries(occasions.map((value) => [value, labelFromValue(value, config.occasionLabels)]))}
              fixedOccasion={config.fixedOccasion}
              onOccasionChange={(value: string) => setFilter("occasion", value)}
              profile={profile}
              profileOptions={profiles}
              profileLabels={Object.fromEntries(profiles.map((value) => [value, labelFromValue(value, config.profileLabels)]))}
              onProfileChange={(value: string) => setFilter("profile", value)}
              priceBounds={priceBounds}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              priceDisabled={usesGreetingCardData}
              sort={sort}
              sortOptions={[
                { value: "featured", label: config.featuredSortLabel || "Featured" },
                { value: "price-low", label: "Price: Low to High" },
                { value: "price-high", label: "Price: High to Low" },
              ]}
              onSortChange={(value: string) => setFilter("sort", value)}
              sortingDisabled={config.sortingSupported === false}
              onClear={clearFilters}
              hasFilters={hasFilters}
            />
          </div>

          {!loading && !error && (
            <p className="gu-collection-result-count" aria-live="polite">
              {filteredProducts.length}{" "}
              {config.dataSource === "greetingCards"
                ? filteredProducts.length === 1 ? "card" : "cards"
                : filteredProducts.length === 1 ? "gift" : "gifts"}
            </p>
          )}

          {loading && (
            <div className="gu-collection-grid" aria-label="Loading products" aria-busy="true">
              {Array.from({ length: 8 }).map((_, index) => (
                <div className="gu-collection-skeleton" key={index} />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="gu-collection-state" role="alert">
              <h2>Something went wrong</h2>
              <p>{error}</p>
              <button type="button" onClick={() => setRetryKey((value) => value + 1)}>
                Try again
              </button>
            </div>
          )}

          {!loading && !error && pageProducts.length > 0 && (
            <div className="gu-collection-grid">
              {pageProducts.map((product, index) => (
                <ProductScrollReveal index={index} key={`${product.category || config.collectionId}-${product.id}`}>
                  {config.dataSource === "greetingCards" ? (
                    <GreetingCardCollectionItem
                      card={product as GreetingCardRecord}
                      eager={index < 4}
                    />
                  ) : (
                    <Product
                      product={{ ...product, category: product.category || config.collectionId }}
                      columns={4}
                      variant="collection"
                      eager={index < 4}
                    />
                  )}
                </ProductScrollReveal>
              ))}
            </div>
          )}

          {!loading && !error && pageProducts.length === 0 && (
            <div className="gu-collection-state">
              <h2>{config.emptyState?.heading || "No gifts match those filters"}</h2>
              <p>{config.emptyState?.message || "Try a different profile or price range."}</p>
              {hasFilters && (
                <button type="button" onClick={clearFilters}>Clear filters</button>
              )}
              {!hasFilters && config.emptyState?.cta && config.emptyState.route && (
                <CartoonButton
                  label={config.emptyState.cta}
                  color="#ff2b3a"
                  to={config.emptyState.route}
                />
              )}
            </div>
          )}

          {!loading && !error && pageProducts.length > 0 && (totalPages > 1 || config.alwaysShowPagination) && (
            <nav className="gu-collection-pagination" aria-label="Product pages">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    type="button"
                    aria-current={pageNumber === currentPage ? "page" : undefined}
                    className={pageNumber === currentPage ? "is-current" : ""}
                    onClick={() => setPage(pageNumber)}
                    key={pageNumber}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setPage(currentPage + 1)}
              >
                Next
              </button>
            </nav>
          )}
        </section>

        {config.builder && (
          <section className="gu-recipient-builder" aria-labelledby="recipient-builder-title">
            <div className="gu-recipient-heading">
              <h2 id="recipient-builder-title">{config.builder.heading}</h2>
              <p>{config.builder.paragraph}</p>
            </div>
            <ol className="gu-recipient-steps">
              {config.builder.steps.map((title, index) => (
                <FeatureCard
                  {...(config.key === "her" ? herBuilderImages[index] : builderImages[index])}
                  className="gu-recipient-step"
                  number={index + 1}
                  title={title}
                  key={title}
                />
              ))}
            </ol>
            <CartoonButton
              className="gu-recipient-builder-cta"
              label={config.builder.cta}
              color="#c8b2eb"
              to={config.builder.route}
            />
          </section>
        )}

        <section className="gu-recipient-faq" aria-labelledby="recipient-faq-title">
          <div className="gu-recipient-heading">
            <h2 id="recipient-faq-title">{config.faqHeading}</h2>
            <p>{config.faqIntroduction}</p>
          </div>
          <Accordion
            className="gu-recipient-faq-list"
            type="single"
            collapsible
            defaultValue={config.faqDefaultOpenId}
          >
            {config.faqItems.map((item) => (
              <AccordionItem value={item.id} key={item.id}>
                <AccordionTrigger className="gu-recipient-faq-trigger">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="gu-recipient-faq-answer">
                  <p>{item.answer}</p>
                  {item.href && item.linkLabel && (
                    item.href.startsWith("http") ? (
                      <a href={item.href} target="_blank" rel="noreferrer">
                        {item.linkLabel}
                      </a>
                    ) : (
                      <Link to={item.href}>{item.linkLabel}</Link>
                    )
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

